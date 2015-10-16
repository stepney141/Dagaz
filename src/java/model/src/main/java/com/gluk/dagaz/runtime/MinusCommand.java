package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Value;

public class MinusCommand extends AbstractCommand {

	private int arity = 0;

	public void addArgument(Object arg) throws CommonException {
		if (!(arg instanceof Integer)) {
			throw new CommonException("Invalid argument");
		}
		arity = (Integer)arg;
		if ((arity < 1) || (arity > 2)) {
			throw new CommonException("Invalid argument value [" + Integer.toString(arity) + "]");
		}
	}

	public boolean execute(IDeferredCheck state, IEnvironment env) throws CommonException { // n [n] -- n
		super.execute(state, env);
		int r = -processor.getStack().pop().getNumber();
		if (arity == 2) {
			r += processor.getStack().pop().getNumber();
		}
		processor.getStack().push(Value.create(r));
		return true;
	}
}
