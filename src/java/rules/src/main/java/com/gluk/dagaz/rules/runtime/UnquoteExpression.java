package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class UnquoteExpression extends UnaryExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		return args.get(0).getValue(env);
	}
}
