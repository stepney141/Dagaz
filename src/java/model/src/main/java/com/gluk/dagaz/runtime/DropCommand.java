package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;

public class DropCommand extends AbstractCommand { // v --

	public DropCommand(Processor processor) {
		super(processor);
	}

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		if (processor.stack.isEmpty()) {
			throw new CommonException("Stack is empty");
		}
		processor.stack.pop();
		return true;
	}
}
