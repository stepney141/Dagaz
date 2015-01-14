package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class AbsExpression extends UnaryExpression {

	protected IValue eval(IEnvironment env) throws EvaluationException {
		long r = Math.abs(args.get(0).getValue(env).getLong());
		return new ConstantValue(r);
	}
}
