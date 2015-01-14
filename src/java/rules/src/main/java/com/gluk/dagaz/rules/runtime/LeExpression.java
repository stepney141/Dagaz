package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class LeExpression extends BinaryExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		boolean r = false;
		try {
			long a = args.get(0).getValue(env).getLong();
			long b = args.get(1).getValue(env).getLong();
			r = (a <= b);
		} catch (ValueNotFoundException e) {
			// Do Nothing
		}
		return ConstantValue.createBoolean(r);
	}
}
