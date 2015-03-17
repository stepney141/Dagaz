package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.BinaryExpression;

public class LetExpression extends BinaryExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		String name = args.get(0).getValue(env).getString();
		IValue value = args.get(1).getValue(env);
		env.letValue(name, value);
		return value;
	}

	@Override
	public boolean isQuoted(int ix) {
		return (ix == 0);
	}

	@Override
	public boolean isNoCaching() {
		return true;
	}
}
