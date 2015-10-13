package com.gluk.dagaz.state;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.AbstractCommand;
import com.gluk.dagaz.runtime.Processor;

public class LogCommand extends AbstractCommand { // v --
	
	public LogCommand(String notation, Processor processor) {
		super(processor);
	}

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		if (processor.stack.isEmpty()) {
			throw new CommonException("Stack is empty");
		}
		processor.gen.log(processor.stack.pop().getString());
		return true;
	}

}
