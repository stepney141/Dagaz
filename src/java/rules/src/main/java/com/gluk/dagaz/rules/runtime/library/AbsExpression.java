package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class AbsExpression extends UnaryExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		long r = Math.abs(args.get(0).getValue(env).getLong());
		return new ConstantValue(r);
	}
}
