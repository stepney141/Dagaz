package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class PlusCommand extends AbstractCommand { // n ... -- n
	
	private int arity = 0;

	public PlusCommand() {
		super("add");
	}

	public void addArgument(Object arg) throws CommonException {
		if (!(arg instanceof Integer)) {
			throw new CommonException("Invalid argument");
		}
		arity = (Integer)arg;
		super.addArgument(arg);
	}
	
	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException { 
		int r = 0;
		for (int i = 0; i < arity; i++) {
			r += processor.getStack().pop().getNumber();
		}
		processor.getStack().push(Value.create(r));
		return true;
	}
}
