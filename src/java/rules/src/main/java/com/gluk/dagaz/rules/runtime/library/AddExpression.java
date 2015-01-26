package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.BaseExpression;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class AddExpression extends BaseExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		long value = 0L;
		for (IExpression e: args) {
			value += e.getValue(env).getLong();
		}
		return new ConstantValue(value);
	}
}
