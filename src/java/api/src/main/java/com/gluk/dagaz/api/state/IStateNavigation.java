package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.StateException;

public interface IStateNavigation {
	IState getPrevState() throws StateException;
	IState getNextState() throws CommonException;
	IState getNextState(String move) throws CommonException;
}
