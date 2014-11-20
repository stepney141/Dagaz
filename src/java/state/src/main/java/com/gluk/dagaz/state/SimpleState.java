package com.gluk.dagaz.state;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.StateException;
import com.gluk.dagaz.api.state.IState;

public class SimpleState extends AbstractState {

	private String nextMove = null;
	private IState nextState = null;

	@Override
	protected AbstractState createClone() {
		return new SimpleState();
	}

	public void addNextState(String move, IState nextState) {
		this.nextMove = move;
		this.nextState = nextState;
	}

	public IState getNextState() throws CommonException {
		if (nextState == null) {
			throw new StateException("Next Move Undefined");
		}
		return nextState;
	}

	public IState getNextState(String move) throws CommonException {
		if (!move.equals(nextMove)) {
			throw new StateException("Next State Undefined");
		}
		return getNextState();
	}

	public boolean isTerminalState() {
		return (nextState == null);
	}
}
