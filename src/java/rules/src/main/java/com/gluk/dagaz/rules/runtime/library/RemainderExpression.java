package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ZeroDivideException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class RemainderExpression extends BinaryExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		long value = args.get(0).getValue(env).getLong();
		long v = args.get(1).getValue(env).getLong();
		if (v == 0L) {
			throw new ZeroDivideException("Zero Divide");
		}
		value %= v;
		return new ConstantValue(value);
	}
}
