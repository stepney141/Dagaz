package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;

public abstract class AbstractCommand implements ICommand {
	
	protected Processor processor;
	
	public AbstractCommand(Processor processor) {
		this.processor = processor;
	}

	public abstract boolean execute(IState state, IEnvironment env) throws CommonException;
}
