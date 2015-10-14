package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;

public class IfCommand extends AbstractCommand { // ? --

	private int offset = 0;
	
	@Override
	public void addArgument(Object arg) throws CommonException {
		if (!(arg instanceof Integer)) {
			throw new CommonException("Invalid argument");
		}
		offset = (Integer)arg;
	}

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		super.execute(state, env);
		if (processor.getStack().isEmpty()) {
			throw new CommonException("Stack is empty");
		}
		if (processor.getStack().pop().getBoolean()) {
			processor.incNextCommand(offset - 1);
		}
		return true;
	}
}
