package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class ConcatExpression extends BaseExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		StringBuffer sb = new StringBuffer();
		for (IExpression e: args) {
			sb.append(e.getValue(env).getString());
		}
		return new ConstantValue(sb.toString());
	}
}
