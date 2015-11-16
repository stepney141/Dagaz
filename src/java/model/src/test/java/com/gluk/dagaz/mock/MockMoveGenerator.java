package com.gluk.dagaz.mock;

import com.gluk.dagaz.api.application.IMoveGenerator;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.state.State;

public class MockMoveGenerator implements IMoveGenerator {
	
	private String notation = "";
	
	public String toString() {
		return notation;
	}

	public void addMove(String notation, State state, IEnvironment env) throws CommonException {
		this.notation = notation;
	}

	public void close(IProcessor processor, IEnvironment env) throws CommonException {}
}
