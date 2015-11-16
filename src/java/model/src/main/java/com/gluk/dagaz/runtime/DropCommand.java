package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class DropCommand extends AbstractCommand { // v --

	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException {
		if (processor.getStack().isEmpty()) {
			throw new CommonException("Stack is empty");
		}
		processor.getStack().pop();
		return true;
	}
}
