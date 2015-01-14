package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class SetExpression extends BaseExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		if (args.size() < 2) {
			throw new EvaluationException("Bad arity");
		}
		IValue value = args.get(args.size() - 1).getValue(env);
		for (int i = 0; i < args.size() - 1; i++) {
			String name = args.get(i).getValue(env).getString();
			env.setValue(name, value);
		}
		return value;
	}

	@Override
	public boolean isQuoted(int ix) {
		return (ix < args.size() - 1);
	}
}
