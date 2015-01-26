package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.BaseAnyExpression;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class AnyRange extends BaseAnyExpression {

	@Override
	public IValue eval(IEnvironment env) throws EvaluationException {
		if (args.size() != 2) {
			throw new EvaluationException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		long a = args.get(0).getValue(env).getLong();
		long b = args.get(1).getValue(env).getLong();
		long d = b - a + 1;
		if (currentVariant > d) {
			throw new CheckException("No Variants");
		}
		addContinuation(env, (int)d);
		return new ConstantValue(a + currentVariant);
	}
}
