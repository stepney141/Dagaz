package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.StateException;

public interface IStateNavigation {
	boolean isInitialState();
	boolean isTerminalState();
	IState  getPrevState() throws StateException;
	IState  getNextState(String move, String mode) throws CommonException;
	IState  getNextState(String move) throws CommonException;
	IState  getNextState() throws CommonException;
}
