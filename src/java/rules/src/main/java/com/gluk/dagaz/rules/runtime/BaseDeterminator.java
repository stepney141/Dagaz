package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class BaseDeterminator extends BaseExpression {

	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.size() < 1) {
			throw new EvaluationException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		return super.getValue(env);
	}
}
