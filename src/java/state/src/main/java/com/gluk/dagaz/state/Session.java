package com.gluk.dagaz.state;

import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.api.state.IStateManager;

public class Session implements IStateManager {
	
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

	public void configure(String name, String value) {
		// TODO:
		
	}

/*	public IState getPrevState() throws StateException {
		IState r = currentState.getPrevState();
		currentState = r;
		return r;
	}

	public IState getNextState() throws CommonException {
		IState r = currentState.getNextState();
		currentState = r;
		return r;
	}

	public IState getNextState(String move, String mode) throws CommonException {
		IState r = currentState.getNextState(move);
		currentState = r;
		return r;
	}*/

	// TODO:
/*	public boolean isSituationRepeated(int count, int deep, String name, Long hash) {
		return currentState.isRepeated(count, true, (deep == 0)?0:(currentState.getTurnNumber() - deep + 1), currentState.getTurnOrder(), name, hash);
	}

	public boolean isSituationRepeated(IBoardManager board, int count, int deep) throws CommonException {
		return currentState.isRepeated(board, count, (deep == 0)?0:(currentState.getTurnNumber() - deep + 1), currentState.getTurnOrder());
	}

	public boolean isPositionRepeated(int count, int deep, String name, Long hash) {
		return currentState.isRepeated(count, true, (deep == 0)?0:(currentState.getTurnNumber() - deep + 1), 0, name, hash);
	}

	public boolean isPositionRepeated(IBoardManager board, int count, int deep) throws CommonException {
		return currentState.isRepeated(board, count, (deep == 0)?0:(currentState.getTurnNumber() - deep + 1), 0);
	}*/
}
