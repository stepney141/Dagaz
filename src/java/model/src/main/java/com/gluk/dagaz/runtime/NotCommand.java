package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Value;

public class NotCommand extends AbstractUnaryCommand { // ? -- ?

	@Override
	public boolean execute(IDeferredCheck state, IEnvironment env) throws CommonException {
		super.execute(state, env);
		if (processor.getStack().isEmpty()) {
			throw new CommonException("Stack is empty");
		}
		processor.getStack().push(Value.create(!processor.getStack().pop().getBoolean()));
		return true;
	}
}
