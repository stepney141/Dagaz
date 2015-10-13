package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.ICodeFixup;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;

public class IfCommand extends AbstractCommand implements ICodeFixup { // ? --

	private int offset = 0;
	
	public IfCommand(Processor processor) {
		super(processor);
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		if (processor.stack.isEmpty()) {
			throw new CommonException("Stack is empty");
		}
		if (processor.stack.pop().getBoolean()) {
			processor.nextCommand += offset - 1;
		}
		return true;
	}
}
