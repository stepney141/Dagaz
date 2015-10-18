package com.gluk.dagaz.api.application;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.state.State;

public interface IMoveGenerator {
	void addMove(String notation, State state, IEnvironment env) throws CommonException;
	void close() throws CommonException;
}
