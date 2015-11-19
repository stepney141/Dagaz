package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class MinusCommand extends AbstractCommand {

	private int arity = 0;

	public MinusCommand() {
		super("sub");
	}

	public void addArgument(Object arg) throws CommonException {
		if (!(arg instanceof Integer)) {
			throw new CommonException("Invalid argument");
		}
		arity = (Integer)arg;
		if ((arity < 1) || (arity > 2)) {
			throw new CommonException("Invalid argument value [" + Integer.toString(arity) + "]");
		}
		super.addArgument(arg);
	}

	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException { // n [n] -- n
		int r = -processor.getStack().pop().getNumber();
		if (arity == 2) {
			r += processor.getStack().pop().getNumber();
		}
		processor.getStack().push(Value.create(r));
		return true;
	}
}
