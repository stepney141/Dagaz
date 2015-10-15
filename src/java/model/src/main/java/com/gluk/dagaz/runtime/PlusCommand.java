package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Value;

public class PlusCommand extends AbstractCommand {
	
	private int arity = 0;

	public void addArgument(Object arg) throws CommonException {
		if (!(arg instanceof Integer)) {
			throw new CommonException("Invalid argument");
		}
		arity = (Integer)arg;
	}
	
	public boolean execute(IState state, IEnvironment env) throws CommonException { // n ... -- n
		super.execute(state, env);
		int r = 0;
		for (int i = 0; i < arity; i++) {
			r += processor.getStack().pop().getNumber();
		}
		processor.getStack().push(Value.create(r));
		return true;
	}
}
