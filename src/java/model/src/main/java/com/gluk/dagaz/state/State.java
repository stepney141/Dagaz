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
import com.gluk.dagaz.board.Board;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.undo.AbstractUndo;
import com.gluk.dagaz.undo.UndoDrop;
import com.gluk.dagaz.undo.UndoMove;
import com.gluk.dagaz.undo.UndoNavigate;
import com.gluk.dagaz.undo.UndoPiece;
import com.gluk.dagaz.undo.UndoTake;
import com.gluk.dagaz.undo.UndoValue;

public class State implements IState, ITransactional {

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
		// TODO:

		return hash;
	}
	
	public void savepoint() {
		deep++;
	}

	public void rollback() throws CommonException {
		while (!undo.isEmpty()) {
			AbstractUndo u = undo.peek();
			if (u.getDeep() <= deep) {
				break;
			}
			u.undo(this);
			undo.pop();
		}
	}

	public void copyTo(IState state) throws CommonException {
		for (String pos: pieces.keySet()) {
			state.setPiece(pos, pieces.get(pos));
		}
		for (String name: values.keySet()) {
			IValue value = values.get(name).get("");
			if (value != null) {
				state.setValue("", value);
			}
		}
	}

	public IValue getFlag(String name, String pos) {
		Map<String, IValue> l = values.get(name);
		if (l == null) {
			return null;
		}
		IValue v = l.get(pos);
		return v;
	}
	
	public IValue getValue(String name) throws CommonException {
		return getFlag(name, "");
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
	
	public void setFlag(String name, String pos, IValue value) throws CommonException {
		IValue oldValue = getFlag(name, pos);
		undo.push(new UndoValue(name, pos, oldValue, deep));
		changeFlag(name, pos, value);
	}
	
	public void setValue(String name, IValue value) throws CommonException {
		setFlag(name, "", value);
	}

	// Важно: После изменения значения атрибута, новый экземпляр фигуры должен передаваться в setPiece
	public IPiece getPiece(String pos) {
		return pieces.get(pos);
	}
	
	public void changePiece(String pos, IPiece piece) {
		if (piece == null) {
			pieces.remove(pos);
		} else {
			pieces.put(pos, piece);
		}
	}
	
	public void setPiece(String pos, IPiece piece) throws CommonException {
		IPiece oldPiece = getPiece(pos);
		if (oldPiece == null && piece == null) {
			throw new CommonException("Position [" + pos + "] already is empty");
		}
		undo.push(new UndoPiece(pos, oldPiece, deep));
		changePiece(pos, piece);
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
	
	public String getCurrentPos() throws CommonException {
		if (currentPos == null) {
			throw new CommonException("Current Position not assigned");
		}
		return currentPos;
	}

	public void setCurrentPosition(String pos) {
		currentPos = pos;
	}

	public boolean navigate(String dir, IEnvironment env) throws CommonException {
		String to = board.navigate(dir, currentPos, env);
		if (to.isEmpty()) {
			return false;
		}
		undo.push(new UndoNavigate(currentPos, deep));
		setCurrentPosition(to);
		return true;
	}
	
	public void setPosition(int ix, String pos) {
		if (ix < hand.size()) {
			hand.get(ix).setPosition(pos);
		}
	}

	public boolean moveHand(String dir, IEnvironment env) throws CommonException {
		boolean r = false;
		for (int ix = 0; ix < hand.size(); ix++) {
			r = true;
			PieceHandler h = hand.get(ix);
			String from = h.getPosition();
			String to = board.navigate(dir, from, env);
			if (to.isEmpty()) {
				for (;ix > 0; ix--) {
					if (undo.isEmpty()) {
						throw new CommonException("Internal Error");
					}
					AbstractUndo u = undo.pop();
					u.undo(this);
				}
				return false;
			}
			undo.push(new UndoMove(from, ix, deep));
			setPosition(ix, to);
		}
		return r;
	}
}