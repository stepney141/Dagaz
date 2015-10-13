package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;

public class GetCommand extends AbstractCommand { // -- v
	
	private String name;

	public GetCommand(String name, Processor processor) {
		super(processor);
		this.name = name;
	}

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		processor.stack.push(env.get(name));
		return true;
	}

}
