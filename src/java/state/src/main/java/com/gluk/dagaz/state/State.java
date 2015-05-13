package com.gluk.dagaz.state;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.CriticalException;
import com.gluk.dagaz.api.exceptions.EmptyPositionException;
import com.gluk.dagaz.api.exceptions.StateException;
import com.gluk.dagaz.api.rules.board.IBoardManager;
import com.gluk.dagaz.api.state.IPosition;
import com.gluk.dagaz.api.state.IState;

public class State extends AbstractValueSet implements IState {
	
	private IBoardManager board;
	
	private int    turnNumber = 1;
	private int    turnOrder  = 1;
	private int    partNumber = 1;
	private IState prevState  = null;
	private Long   hash       = null; 
	private String next       = null;
	
	private Map<String, Set<Long>>    hashes = new HashMap<String, Set<Long>>();
	private Map<String, IPosition> positions = new HashMap<String, IPosition>();
	private Map<String, PieceList>     lists = new HashMap<String, PieceList>();
	private Map<String, IState>       states = new HashMap<String, IState>(); 
	
	public State(IBoardManager board) {
		this.board = board;
	}

	public State(IState s, int turnNumber, int turnOrder) {
		this.board      = s.getBoardManager();
		this.prevState  = s;
		this.turnNumber = turnNumber;
		this.turnOrder  = turnOrder;
		if ((turnNumber == s.getTurnNumber()) && (turnOrder == s.getTurnOrder())) {
			this.partNumber++;
		}
		for (String name: s.getPersistentValues()) {
			setValue(name, s.getValue(name));
		}
		for (String name: s.getPositions()) {
			IPosition p = s.getPosition(name);
			if (!p.isClear()) {
				positions.put(name, p);
			}
		}
	}
	
	public IBoardManager getBoardManager() {
		return board;
	}
	
	public Collection<String> getPositions() {
		return positions.keySet();
	}

	public int getTurnNumber() {
		return turnNumber;
	}

	public int getTurnOrder() {
		return turnOrder;
	}

	public int getPartNumber() {
		return partNumber;
	}

	public boolean isPositionExists(String position) {
		return positions.containsKey(position);
	}

	public IPosition getPosition(String position) {
		IPosition r = positions.get(position);
		if (r == null) {
			r = new Position();
			positions.put(position, r);
		}
		return r;
	}
	
	public boolean isInitialState() {
		return (prevState == null);
	}

	public boolean isTerminalState() {
		return (next == null);
	}

	public IState getPrevState() throws StateException {
		if (prevState == null) {
			throw new StateException("Prev State Undefined");
		}
		return prevState;
	}

	public void takePiece(String name, String pos, boolean isCut) throws CommonException {
		if (!isPositionExists(pos)) {
			throw new EmptyPositionException("Position [" + pos + "] not found");
		}
		IPosition p = getPosition(pos);
		if (p.isEmpty()) {
			throw new EmptyPositionException("Position [" + pos + "] is empty");
		}
		PieceList l = lists.get(name);
		if (l == null) {
			l = new PieceList();
			lists.put(name, l);
		}
		PiecePosition pp = new PiecePosition(p.getPiece(), pos);
		l.add(pp);
		if (isCut) {
			p.delPiece();
		}
	}

	public void dropPieces(String name) throws CommonException {
		PieceList l = lists.get(name);
		if (l == null) {
			throw new CriticalException("List [" + name + "] not found");
		}
		for (PiecePosition pp: l.getPieces()) {
			IPosition p = getPosition(pp.getPosition());
			p.addPiece(pp.getPiece());
		}
		lists.remove(l);
	}
	
	public void setAttribute(String pos, String name, String value) throws EmptyPositionException {
		for (PieceList list: lists.values()) {
			list.setAttribute(pos, name, value);
		}
		if (isPositionExists(pos)) {
			IPosition p = getPosition(pos);
			if (!p.isEmpty()) {
				p.setAttribute(name, value);
				return;
			}
		}
	}

	public boolean isEqual(IState s) {
		for (String pos: s.getPositions()) {
			IPosition p = s.getPosition(pos);
			if (!p.isClear()) {
				if (!isPositionExists(pos)) return false;
				if (!p.isEqual(getPosition(pos))) return false;
			}
		}
		for (String pos: getPositions()) {
			IPosition p = getPosition(pos);
			if (!p.isClear()) {
				if (!s.isPositionExists(pos)) return false;
				if (!p.isEqual(s.getPosition(pos))) return false;
			}
		}
		return super.isEqual(s);
	}
	
	private long getHash() {
		if (hash == null) {
			hash = 0L;
			try {
				for (String position: positions.keySet()) {
					hash = board.addToHash(hash, position, this);
				}
			} catch (CommonException e) {
				hash = null;
			}
		}
		return hash;
	}

	public void addState(String move, IState state) {
		states.put(move, state);
		next = move;
	}

	public IState getNextState(String move) throws CommonException {
		IState r = states.get(move);
		if (r == null) {
			throw new CriticalException("Move [" + move + "] not found");
		}
		next = move;
		return r;
	}

	public IState getNextState() throws CommonException {
		if (isTerminalState()) {
			throw new CriticalException("This is terminal state");
		}
		return getNextState(next);
	}

	public boolean isRepeated(int count, boolean isStarted, int deep, int turnOrder, int prevOrder, int prevNumber, String name, Long hash) {
		if (hash.equals(0L)) return false;
		if (deep < 0) return false;
		Set<Long> set = hashes.get(name);
		if (set == null) {
			set = new HashSet<Long>();
			hashes.put(name, set);
		}
		if (!isStarted && ((prevOrder != getTurnOrder()) || prevNumber != getTurnNumber())) { 
			if ((turnOrder == 0) || (turnOrder == getTurnOrder())) {
				if (deep > 0) {
					deep--;
				}
				if (set.contains(hash)) {
					if (--count <= 0) return true;
				}
			}
		}
		if (prevState == null) {
			return false;
		}
		boolean r = prevState.isRepeated(count, false, deep, turnOrder, prevOrder, prevNumber, name, hash);
		if (isStarted && !r) {
			if (!set.contains(hash)) {
				set.add(hash);
			}
		}
		return r;
	}
	
	public boolean isRepeated(int count, int deep, int turnOrder, int prevOrder, int prevNumber, long hash, IState state) throws CommonException {
		if (deep < 0) return false;
		if (prevOrder != getTurnOrder() || prevNumber != getTurnNumber()) { 
			if ((turnOrder == 0) || (turnOrder == getTurnOrder())) {
				if (deep > 0) {
					deep--;
				}
				if (hash == getHash()) {
					if (state.isEqual(this)) {
						if (--count <= 0) return true;
					}
				}
			}
		}
		if (prevState == null) {
			return false;
		}
		return prevState.isRepeated(count, deep, turnOrder, prevOrder, prevNumber, hash, state);
	}
	
	public boolean isRepeated(int count, int deep, int turnOrder) throws CommonException {
		long hash = getHash();
		if (prevState == null) {
			return false;
		}
		return prevState.isRepeated(count, deep, turnOrder, getTurnOrder(), getTurnNumber(), hash, this);
	}
}
