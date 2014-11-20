package com.gluk.dagaz.state;

import com.gluk.dagaz.api.exceptions.StateException;
import com.gluk.dagaz.api.state.ISession;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.api.state.IStateManager;

public class StateManager implements IStateManager {
	
	private final static String FULL_STATE_FLAG = "full_state";
	
	private static IStateManager instance = null;
	private boolean isFullState = false;
	
	private StateManager() {}
	
	public synchronized static IStateManager getInstance() {
		if (instance == null) {
			instance = new StateManager();
		}
		return instance;
	}

	public void configure(String name, String value) {
		if (name.equals(FULL_STATE_FLAG)) {
			isFullState = true;
		}
	}

	public ISession createSession() throws StateException {
		IState s = null;
		if (isFullState) {
			s = new FullState();
		} else {
			s = new SimpleState();
		}
		return new Session(s); 
	}

}
