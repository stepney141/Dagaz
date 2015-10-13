package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;

// TODO: Navigate All using

public class PutCommand extends AbstractCommand { // --

	public PutCommand(Processor processor) {
		super(processor);
	}

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		state.dropHand();
		return true;
	}
}
