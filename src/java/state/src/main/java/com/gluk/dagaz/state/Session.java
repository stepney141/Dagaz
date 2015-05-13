package com.gluk.dagaz.state;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.api.state.ISession;

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

	public boolean isSituationRepeated(String name, Long hash, int count, int deep) {
		return currentState.isRepeated(count, true, deep, currentState.getTurnOrder(), currentState.getTurnOrder(), currentState.getTurnNumber(), name, hash);
	}

	public boolean isSituationRepeated(int count, int deep) throws CommonException {
		return currentState.isRepeated(count, deep, currentState.getTurnOrder());
	}

	public boolean isPositionRepeated(String name, Long hash, int count, int deep) {
		return currentState.isRepeated(count, true, deep, 0, currentState.getTurnOrder(), currentState.getTurnNumber(), name, hash);
	}

	public boolean isPositionRepeated(int count, int deep) throws CommonException {
		return currentState.isRepeated(count, deep, 0);
	}
}
