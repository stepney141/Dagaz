package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;

public class LetCommand extends AbstractCommand { // v --

	private String name;

	public LetCommand(String name, Processor processor) {
		super(processor);
		this.name = name;
	}

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		if (processor.stack.isEmpty()) {
			throw new CommonException("Stack is empty");
		}
		env.let(name, processor.stack.pop());
		return true;
	} 
}
