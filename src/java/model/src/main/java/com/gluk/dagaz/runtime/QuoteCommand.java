package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class QuoteCommand extends AbstractCommand { // -- 'v

	private String name = null;

	@Override
	public void addArgument(Object arg) throws CommonException {
		if ((name != null) || !(arg instanceof String)) {
			throw new CommonException("Invalid argument");
		}
		name = (String)arg;
	}
	
	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException {
		String operand = name;
		if (operand == null) {
			if (processor.getStack().isEmpty()) {
				throw new CommonException("Stack is empty");
			}
			operand = processor.getStack().pop().getString();
		}
		processor.getStack().push(Value.quote(operand));
		return true;
	}
}
