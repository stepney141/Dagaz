package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class MultiplyExpression extends BaseExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		long value = 1L;
		for (IExpression e: args) {
			value *= e.getValue(env).getLong();
		}
		return new ConstantValue(value);
	}
}
