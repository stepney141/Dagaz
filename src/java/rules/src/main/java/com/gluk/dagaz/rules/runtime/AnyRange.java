package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class AnyRange extends BinaryExpression {

	private int currentVariant = 0; // TODO: Сбрасывается при завершении обработки Continuation-а
	
	public IValue getValue(IEnvironment env) throws EvaluationException {
		long a = args.get(0).getValue(env).getLong();
		long b = args.get(1).getValue(env).getLong();
		long x = a + currentVariant;
		if (x > b) {
			throw new CheckException("No Variants");
		}
		if (x + 1 <= b) {
			env.pushTrace(currentVariant + 1);
			env.addContinuation();
			env.popTrace();
		}
		return new ConstantValue(x);
	}
}
