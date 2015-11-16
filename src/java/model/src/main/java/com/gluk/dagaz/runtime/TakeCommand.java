package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class TakeCommand extends AbstractCommand { // --

	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException {
		state.takePiece();
		return true;
	}
}
