package com.gluk.dagaz.api.application;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.ITransactional;
import com.gluk.dagaz.exceptions.CommonException;

public interface IMoveLogger extends ITransactional {
	void endMove(IEnvironment env) throws CommonException;
	void log(String notation);
}
