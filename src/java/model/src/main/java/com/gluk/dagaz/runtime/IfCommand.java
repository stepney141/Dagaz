package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class IfCommand extends AbstractCommand { // ? --

	private int offset = 1;
	
	public IfCommand() {
		super(IReserved.CMD_IF);
	}

	@Override
	public int getOffset() {
		return offset - 1;
	}
	
	@Override
	public void addArgument(Object arg) throws CommonException {
		if (!(arg instanceof Integer)) {
			throw new CommonException("Invalid argument");
		}
		offset = (Integer)arg;
	}

	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException {
		if (processor.getStack().isEmpty()) {
			throw new CommonException("Stack is empty");
		}
		if (processor.getStack().pop().getBoolean()) {
			processor.incNextCommand(offset - 1);
		}
		return true;
	}
}
