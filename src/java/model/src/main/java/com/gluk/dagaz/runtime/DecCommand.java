package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Value;

public class DecCommand extends AbstractCommand { // -- n

	private String name;

	public DecCommand(String name, Processor processor) {
		super(processor);
		this.name = name;
	}

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		IValue v = env.get(name);
		env.set(name, Value.create(v.getNumber() - 1)); // Важно: 0 интерпретируется как false
		processor.stack.push(v);
		return true;
	}

}
