package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class CheckCommand extends AbstractCommand { // ? --

	public CheckCommand() {
		super(IReserved.CMD_CHECK);
	}

	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException {
		if (processor.getStack().isEmpty()) {
			throw new CommonException("Stack is empty");
		}
		return processor.getStack().pop().getBoolean();
	}
}
