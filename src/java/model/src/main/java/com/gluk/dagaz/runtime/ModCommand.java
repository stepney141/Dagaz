package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class ModCommand extends AbstractBinaryCommand { // a b -- n

	public boolean execute(IDeferredCheck state, IEnvironment env) throws CommonException { 
		super.execute(state, env);
		int b = processor.getStack().pop().getNumber();
		int a = processor.getStack().pop().getNumber();
		processor.getStack().push(Value.create(a % b));
		return true;
	}
}
