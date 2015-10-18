package com.gluk.dagaz.api.application;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public interface IMoveLogger {
	void endMove(IEnvironment env) throws CommonException;
	void log(String notation);
}
