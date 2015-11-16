package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class PutCommand extends AbstractCommand { // --

	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException {
		state.dropPieces();
		return true;
	}
}
