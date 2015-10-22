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
import com.gluk.dagaz.utils.PieceHandler;

// TODO: Get and set Piece'a attributes

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

	public void clear() {
		pieces.clear();
		hand.clear();
		values.clear();
		undo.clear();
		currentPos = null;
		hash = 0L;
		deep = 0;
	}
	
	public boolean equals(State s) {
		return this == s;
	}
	
	public int hashCode() {
		return super.hashCode();
	}
	
	public long getZobristHash() {
		return hash;
	}
	
	public String getPosition() throws CommonException {
		if (currentPos == null) {
			throw new CommonException("Position unassigned");
		}
		return currentPos;
	}

	public void savepoint() {
		deep++;
	}

	public boolean rollback() throws CommonException {
		if (undo.isEmpty()) {
			return false;
		}
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
		State r = (State)super.clone();
		for (String pos: pieces.keySet()) {
			r.changePiece(pos, pieces.get(pos));
		}
		for (String name: values.keySet()) {
			IValue value = values.get(name).get("");
			if (value != null) {
				r.changeFlag(name, "", value);
			}
		}
		return r;
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

	public IPiece getPiece(String pos) {
		return pieces.get(pos);
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
	
	public void changeAttribute(String pos, String name, IValue value) throws CommonException {
		IPiece piece = getPiece(pos);
		if (piece == null) {
			throw new CommonException("Position [" + pos + "] is empty");
		}
		piece = piece.setAttribute(name, value);
		changePiece(pos, piece);
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
		if (!dir.equals(to)) {
			for (int ix = 0; ix < hand.size(); ix++) {
				PieceHandler h = hand.get(ix);
				String from = h.getPosition();
				to = board.navigate(dir, from, env);
				if (to.isEmpty()) {
					for (;ix > 0; ix--) {
						if (undo.isEmpty()) {
							throw new CommonException("Internal Error");
						}
						AbstractUndo u = undo.pop();
						u.execute(this);
					}
					return false;
				}
				undo.push(new UndoMove(from, ix, deep));
				setPosition(ix, to);
			}
		}
		return true;
	}
	
	public void setPosition(int ix, String pos) {
		if (ix < hand.size()) {
			hand.get(ix).setPosition(pos);
		}
	}

	public boolean isDefined(String name) {
		Map<String, IValue> l = values.get(name);
		if (l != null) {
			if (l.get("") != null) {
				return true;
			}
		}
		return board.isDefined(name);
	}
}