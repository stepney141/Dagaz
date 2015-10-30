package com.gluk.dagaz.state;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.api.state.ITransactional;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.model.Board;
import com.gluk.dagaz.undo.AbstractUndo;
import com.gluk.dagaz.undo.UndoDrop;
import com.gluk.dagaz.undo.UndoMove;
import com.gluk.dagaz.undo.UndoPiece;
import com.gluk.dagaz.undo.UndoPos;
import com.gluk.dagaz.undo.UndoTake;
import com.gluk.dagaz.undo.UndoValue;
import com.gluk.dagaz.utils.PieceHandler;

public class State extends DeferredCheck implements ITransactional, Cloneable {

	private Board board;
	private Map<String, IPiece> pieces = new HashMap<String, IPiece>();
	private List<PieceHandler> hand = new ArrayList<PieceHandler>();
	private Map<String, Map<String, IValue>> values = new HashMap<String, Map<String, IValue>>();
	private Stack<AbstractUndo> undo = new Stack<AbstractUndo>();
	private String currentPos = null;
	private long hash = 0L;
	private int deep = 0;
	
	public State(Board board) {
		this.board = board;
	}

	public long getZobristHash() {
		return hash;
	}
	
	public boolean isDefined(String name) {
		// Проверка определения значения уровня доски
		if (board.getDefaultValue(name) != null) {
			return true;
		}
		// Если задана текущая позиция
		if (currentPos != null) {
			IPiece p = pieces.get(currentPos);
			// И на ней есть фигура
			if (p != null) {
				// Проверка определения атрибута фигуры
				if (board.getDefaultValue(p.getName(), name) != null) {
					return true;
				}
			}
			// Иначе - проверка наличия позиционного флага
			return getFlag(name, currentPos) != null;
		}
		// Проверка определения имени на уровне модели (имя позиции или направления)
		return board.isDefined(name);
	}
	
	public IValue getValue(String name) throws CommonException {
		IValue defValue = board.getDefaultValue(name);
		if (defValue != null) {
			// Получение значения уровня доски
			IValue r = getFlag(name, "");
			if (r == null) {
				// Брать значение по умолчанию, если не определено
				r = defValue;
			}
			return r;
		}
		// Если задана текущая позиция
		if (currentPos != null) {
			IPiece p = pieces.get(currentPos);
			// И на ней есть фигура
			if (p != null) {
				defValue = board.getDefaultValue(p.getName(), name);
				if (defValue != null) {
					// Получение значения атрибута
					IValue r = p.getAttribute(name);
					if (r == null) {
						// Брать значение по умолчанию, если не определено
						r = defValue;
					}
					return r;
				}
			}
			// Получение значения позиционного флага
			return getFlag(name, currentPos);
		}
		// Значение не определено (исключение бросается в StateEnvironment)
		return null;
	}
	
	public void setValue(String name, IValue value) throws CommonException {
		if (board.getDefaultValue(name) != null) {
			// Изменение значения уровня доски (не привязанного к позиции)
			setFlag(name, "", value);
			return;
		}
		// Если задана текущая позиция
		if (currentPos != null) {
			IPiece p = pieces.get(currentPos);
			// И на ней есть фигура
			if (p != null) {
				// И для фигуры определён атрибут
				if (board.getDefaultValue(p.getName(), name) != null) {
					// Изменить значение атрибута (создаётся новый экземпляр фигуры)
					p = p.setAttribute(name, value);
					// Изменённая фигура размещается на текущей позиции
					setPiece(currentPos, p);
					return;
				}
			}
			setFlag(name, currentPos, value);
			return;
		}
		// Запрещается изменение не определённых значений
		throw new CommonException("Value [" + name + "] undefined");
	}

	public String getCurrentPosition() throws CommonException {
		return currentPos;
	}

	public void setCurrentPosition(String pos) {
		// Не определено в IState, использовать navigate для позиционирования
		undo.push(new UndoPos(currentPos, deep));
		changeCurrentPosition(pos);
	}
	
	public IPiece getPiece(String pos) {
		return pieces.get(pos);
	}
	
	public void setPiece(String pos, IPiece piece) throws CommonException {
		IPiece oldPiece = getPiece(pos);
		undo.push(new UndoPiece(pos, oldPiece, deep));
		changePiece(pos, piece);
	}
	
	public void addToHand(String pos, IPiece piece) throws CommonException {
		undo.push(new UndoTake(deep));
		toHand(pos, piece);
	}
	
	public void dropHand() throws CommonException {
		for (int ix = hand.size() - 1; ix >= 0; ix--) {
			PieceHandler h = hand.get(ix);
			undo.push(new UndoDrop(h.getPosition(), h.getPiece(), deep));
			if (getPiece(h.getPosition()) != null) {
				throw new CommonException("Position [" + h.getPosition() + "] is not empty");
			}
			changePiece(h.getPosition(), h.getPiece());
		}
		hand.clear();
	}
	
	public boolean navigate(String dir, IEnvironment env) throws CommonException {
		// Запрос у модели результирующей позиции
		String to = board.navigate(dir, currentPos, env);
		if (to.isEmpty()) {
			// Имя не известно модели, навигация не успешна
			return false;
		}
		// Изменение текущей позиции
		int currUndoSize = undo.size();
		setCurrentPosition(to);
		// Если для навигации использовано имя направления, а не имя позиции 
		if (!dir.equals(to)) {
			// Переместить фигуры "в руке" (над доской)
			for (int ix = 0; ix < hand.size(); ix++) {
				PieceHandler h = hand.get(ix);
				String from = h.getPosition();
				// Получение результрующей позиции для фигуры "в руке" 
				to = board.navigate(dir, from, env);
				if (to.isEmpty()) {
					// Если синхронное перемещение всех фигур невозможно
					while (undo.size() > currUndoSize) {
						// Локальный откат перемещения
						AbstractUndo u = undo.pop();
						u.execute(this);
					}
					// Выполнить навигацию не удалось
					return false;
				}
				// Перемещение фигуры "в руке"
				undo.push(new UndoMove(from, ix, deep));
				setPosition(ix, to);
			}
		}
		// Навигация успешна
		return true;
	}
	
	public void clear() {
		pieces.clear();
		hand.clear();
		values.clear();
		undo.clear();
		currentPos = null;
		hash = 0L;
		deep = 0;
	}
	
	public void savepoint() {
		deep++;
	}

	public boolean rollback() throws CommonException {
		if (deep == 0) {
			return false;
		}
		deep--;
		while (!undo.isEmpty()) {
			AbstractUndo u = undo.peek();
			if (u.getDeep() <= deep) {
				break;
			}
			u.execute(this);
			undo.pop();
		}
		return true;
	}

	public IState clone() throws CloneNotSupportedException {
		State r = new State(board);
		// Копировать размещение фигур на доске
		for (String pos: pieces.keySet()) {
			r.changePiece(pos, pieces.get(pos));
		}
		// Копировать значения уровня доски (не привязанные к позициям)
		for (String name: values.keySet()) {
			IValue value = values.get(name).get("");
			if (value != null) {
				r.changeFlag(name, "", value);
			}
		}
		return r;
	}
	
	private IValue getFlag(String name, String pos) {
		Map<String, IValue> l = values.get(name);
		if (l == null) {
			return null;
		}
		IValue v = l.get(pos);
		return v;
	}
	
	private void setFlag(String name, String pos, IValue value) throws CommonException {
		IValue oldValue = getFlag(name, pos);
		undo.push(new UndoValue(name, pos, oldValue, deep));
		changeFlag(name, pos, value);
	}
	
	public void changeFlag(String name, String pos, IValue value) {
		Map<String, IValue> l = values.get(name);
		if (l == null) {
			l = new HashMap<String, IValue>();
			values.put(name, l);
		}
		if (value == null) {
			l.remove(pos);
		} else {
			l.put(pos, value);
		}
	}
	
	public void changeCurrentPosition(String pos) {
		currentPos = pos;
	}
	
	public void changePiece(String pos, IPiece piece) {
		IPiece p = getPiece(pos);
		if (p != null) {
			hash ^= p.getHash(pos);
		}
		if (piece == null) {
			pieces.remove(pos);
		} else {
			hash ^= piece.getHash(pos);
			pieces.put(pos, piece);
		}
	}
	
	public void undoTake() {
		int ix = hand.size() - 1;
		if (ix >= 0) {
			hand.remove(ix);
		}
	}
	
	public void toHand(String pos, IPiece piece) {
		hand.add(new PieceHandler(pos, piece));
	}
	
	public void setPosition(int ix, String pos) {
		if (ix < hand.size()) {
			hand.get(ix).setPosition(pos);
		}
	}
}