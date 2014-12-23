package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class AddExpression extends BaseExpression {

	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.size() < 1) {
			throw new EvaluationException("Bad arity");
		}
		long value = 0L;
		for (IExpression e: args) {
			value += e.getValue(env).getLong();
		}
		return new ConstantValue(value);
	}
}
