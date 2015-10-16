package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public abstract class AbstractCommand implements ICommand {
	
	protected IProcessor processor = null;
	private boolean isDeferred = false;
	
	public boolean isDeferred() {
		return isDeferred;
	}
	
	public void setDeferred() {
		isDeferred = true;
	}
	
	public boolean execute(IDeferredCheck state, IEnvironment env) throws CommonException {
		if (processor == null) {
			throw new CommonException("Internal error");
		}
		return true;
	}
	
	public void addArgument(Object arg) throws CommonException {}
	public void setProcessor(IProcessor processor) {this.processor = processor;}
}
