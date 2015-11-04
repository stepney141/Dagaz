package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class LetCommand extends AbstractCommand { // v --

	private String name = null;

	@Override
	public void addArgument(Object arg) throws CommonException {
		if ((name != null) || !(arg instanceof String)) {
			throw new CommonException("Invalid argument");
		}
		name = (String)arg;
	}

	@Override
	public boolean execute(IDeferredCheck state, IEnvironment env) throws CommonException {
		super.execute(state, env);
		if (name == null) {
			throw new CommonException("Invalid arguments");
		}
		if (processor.getStack().isEmpty()) {
			throw new CommonException("Stack is empty");
		}
		IValue v = processor.getStack().pop();
		if (env.isDefined(v.getString())) {
			v = Value.quote(v.getString());
		}
		env.let(name, v);
		return true;
	} 
}
