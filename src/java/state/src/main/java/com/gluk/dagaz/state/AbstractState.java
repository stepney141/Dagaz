package com.gluk.dagaz.state;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.StateException;
import com.gluk.dagaz.api.rules.board.IBoard;
import com.gluk.dagaz.api.state.IPosition;
import com.gluk.dagaz.api.state.IState;

public abstract class AbstractState extends AbstractValueSet implements IState {
	
	private int turnNumber = 0;
	private int turnOrder = 0;
	private long positionalHash = 0L;
	private Map<String, Set<Long>> hashes = new HashMap<String, Set<Long>>();
	private Map<String, IPosition> positions = new HashMap<String, IPosition>();
	private IState prevState = null;
	
	protected abstract AbstractState createClone();
	
	protected void setPrevState(IState prevState) {
		this.prevState = prevState;
	}
	
	protected void addPosition(String name, IPosition position) {
		positions.put(name, position);
	}

	public int getTurnNumber() {
		return turnNumber;
	}

	public void setTurnNumber(int turnNumber) {
		this.turnNumber = turnNumber;
	}
	
	public int getTurnOrder() {
		return turnOrder;
	}

	public void setTurnOrder(int turnOrder) {
		this.turnOrder = turnOrder;
	}

	public IPosition getPosition(String position) {
		IPosition r = positions.get(position);
		if (r == null) {
			r = new Position();
			positions.put(position, r);
		}
		return r;
	}
	
	public IState getClone() {
		AbstractState r = createClone();
		r.setPrevState(this);
		r.setTurnOrder(this.turnOrder);
		copyValuesTo(r);
		for (String name: positions.keySet()) {
			IPosition p = positions.get(name);
			if ((p != null) && p.isClonable()) {
				r.addPosition(name, p.getClone());
			}
		}
		return r;
	}

	public IState getPrevState() throws StateException {
		if (prevState == null) {
			throw new StateException("Prev State Undefined");
		}
		return prevState;
	}

	public boolean isInitialState() {
		return (prevState == null);
	}

	public boolean positionExists(String position) {
		return positions.containsKey(position);
	}
	
	public int getPositionsCount() {
		return positions.size();
	}

	public boolean isEqual(IState state) throws CommonException {
		if (positions.size() != state.getPositionsCount())return false;
		for (String p: positions.keySet()) {
			if (!state.positionExists(p)) return false;
			if (!positions.get(p).isEqual(state.getPosition(p))) return false;
		}
		return true;
	}

	public boolean isRepeated(int count, boolean isStarted, int minTurnNumber, int turnOrder,  String name, Long hash) {
		if (hash.equals(0L)) return false;
		if (minTurnNumber > 0) {
			if (getTurnNumber() < minTurnNumber) return false;
		}
		Set<Long> set = hashes.get(name);
		if (set == null) {
			set = new HashSet<Long>();
			hashes.put(name, set);
		}
		if (!isStarted && ((turnOrder == 0) || (turnOrder == getTurnOrder()))) {
			if (set.contains(hash)) {
				if (--count <= 0) return true;
			}
		}
		if (prevState == null) {
			return false;
		}
		boolean r = prevState.isRepeated(count, false, minTurnNumber, turnOrder, name, hash);
		if (isStarted && !r) {
			if (!set.contains(hash)) {
				set.add(hash);
			}
		}
		return r;
	}
	
	private long getPositionalHash(IBoard board) {
		if (positionalHash == 0L) {
			try {
				for (String position: positions.keySet()) {
					positionalHash = board.addToHash(positionalHash, position, this);
				}
			} catch (CommonException e) {
				positionalHash = 0L;
			}
		}
		return positionalHash;
	}

	public boolean isRepeated(IBoard board, int count, int minTurnNumber, int turnOrder, long hash, IState state) throws CommonException {
		if (minTurnNumber > 0) {
			if (getTurnNumber() < minTurnNumber) return false;
		}
		if ((turnOrder == 0) || (turnOrder == getTurnOrder())) {
			if (hash == getPositionalHash(board)) {
				if (state.isEqual(this)) {
					if (--count <= 0) return true;
				}
			}
		}
		if (prevState == null) {
			return false;
		}
		return prevState.isRepeated(board, count, minTurnNumber, turnOrder, hash, state);
	}
	
	public boolean isRepeated(IBoard board, int count, int minTurnNumber, int turnOrder) throws CommonException {
		long hash = getPositionalHash(board);
		if (prevState == null) {
			return false;
		}
		return prevState.isRepeated(board, count, minTurnNumber, turnOrder, hash, this);
	}
}
