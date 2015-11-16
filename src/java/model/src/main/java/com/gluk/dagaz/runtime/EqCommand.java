package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class EqCommand extends AbstractBinaryCommand { // a b -- ?

	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException { 
		String b = processor.getStack().pop().getString();
		String a = processor.getStack().pop().getString();
		processor.getStack().push(Value.create(a.equals(b)));
		return true;
	}
}
