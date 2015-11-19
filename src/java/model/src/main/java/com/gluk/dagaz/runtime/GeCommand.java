package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class GeCommand extends AbstractBinaryCommand { // a b -- ?

	public GeCommand() {
		super("ge");
	}

	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException { 
		int b = processor.getStack().pop().getNumber();
		int a = processor.getStack().pop().getNumber();
		processor.getStack().push(Value.create(a >= b));
		return true;
	}
}
