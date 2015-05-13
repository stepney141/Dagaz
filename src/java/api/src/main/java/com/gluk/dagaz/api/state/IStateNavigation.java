package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.StateException;

public interface IStateNavigation {
	boolean isInitialState();
	boolean isTerminalState();
	void    addState(String move, IState state);
	IState  getPrevState() throws StateException;
	IState  getNextState(String move) throws CommonException;
	IState  getNextState() throws CommonException;
}
