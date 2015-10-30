package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class PlusCommand extends AbstractCommand { // n ... -- n
	
	private int arity = 0;

	public void addArgument(Object arg) throws CommonException {
		if (!(arg instanceof Integer)) {
			throw new CommonException("Invalid argument");
		}
		arity = (Integer)arg;
	}
	
	public boolean execute(IDeferredCheck state, IEnvironment env) throws CommonException { 
		super.execute(state, env);
		int r = 0;
		for (int i = 0; i < arity; i++) {
			r += processor.getStack().pop().getNumber();
		}
		processor.getStack().push(Value.create(r));
		return true;
	}
}
