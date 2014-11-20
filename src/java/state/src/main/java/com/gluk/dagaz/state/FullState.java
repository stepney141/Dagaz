package com.gluk.dagaz.state;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.CriticalException;
import com.gluk.dagaz.api.exceptions.StateException;
import com.gluk.dagaz.api.state.IState;

public class FullState extends AbstractState {
	
	private String nextMove = null;
	private Map<String, IState> nextStates = new HashMap<String, IState>();

	@Override
	protected AbstractState createClone() {
		return new FullState();
	}

	public void addNextState(String move, IState nextState) {
		this.nextMove = move;
		nextStates.put(move, nextState);
	}

	public IState getNextState(String move) throws CommonException {
		IState r = nextStates.get(nextMove);
		if (r == null) {
			throw new CriticalException("Next State Undefined");
		}
		return r;
	}

	public IState getNextState() throws CommonException {
		if (nextMove == null) {
			throw new StateException("Next Move Undefined");
		}
		return getNextState(nextMove);
	}

	public boolean isTerminalState() {
		return nextStates.isEmpty();
	}
}
