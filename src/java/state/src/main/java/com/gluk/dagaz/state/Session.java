package com.gluk.dagaz.state;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.StateException;
import com.gluk.dagaz.api.state.ISession;
import com.gluk.dagaz.api.state.IState;

public class Session implements ISession {
	
	private IState initialState;
	private IState currentState;
	
	public Session(IState state) {
		this.initialState = state;
		this.currentState = state;
	}

	public IState getInitialState() {
		return initialState;
	}

	public IState getCurrentState() {
		return currentState;
	}

	public IState getPrevState() throws StateException {
		IState r = currentState.getPrevState();
		currentState = r;
		return r;
	}

	public IState getNextState() throws CommonException {
		IState r = currentState.getNextState();
		currentState = r;
		return r;
	}

	public IState getNextState(String move) throws CommonException {
		IState r = currentState.getNextState(move);
		currentState = r;
		return r;
	}
}
