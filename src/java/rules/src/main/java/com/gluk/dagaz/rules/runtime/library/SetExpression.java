package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class SetExpression extends BinaryExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		String name = args.get(0).getValue(env).getString();
		IValue value = args.get(1).getValue(env);
		env.setValue(name, value);
		return value;
	}

	@Override
	public boolean isQuoted(int ix) {
		return (ix == 0);
	}
}
