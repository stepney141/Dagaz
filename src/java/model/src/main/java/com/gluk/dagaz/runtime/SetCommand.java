package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IValue;
import com.gluk.dagaz.exceptions.CommonException;

public class SetCommand extends AbstractCommand { // v --

	private String name = null;

	public SetCommand() {
		super(IReserved.CMD_SET);
	}

	@Override
	public void addArgument(Object arg) throws CommonException {
		if ((name != null) || !(arg instanceof String)) {
			throw new CommonException("Invalid argument");
		}
		name = (String)arg;
		super.addArgument(arg);
	}

	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException {
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
		env.set(name, v);
		return true;
	} 
}
