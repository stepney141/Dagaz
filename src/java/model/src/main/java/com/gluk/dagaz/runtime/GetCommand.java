package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class GetCommand extends AbstractCommand { // [s] -- v
	
	private String name = null;

	@Override
	public void addArgument(Object arg) throws CommonException {
		if ((name != null) || !(arg instanceof String)) {
			throw new CommonException("Invalid argument");
		}
		name = (String)arg;
	}
	
	@Override
	public String getValueName() {
		return name;
	}
	
	@Override
	public boolean execute(IDeferredCheck state, IEnvironment env) throws CommonException {
		super.execute(state, env);
		String operand = name;
		if (operand == null) {
			if (processor.getStack().isEmpty()) {
				throw new CommonException("Stack is empty");
			}
			operand = processor.getStack().pop().getString();
		}
		IValue value = env.get(operand);
		if (value.isReference()) {
			value = env.get(value.getString());
		}
		processor.getStack().push(value);
		return true;
	}
}
