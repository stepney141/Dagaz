package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public abstract class BaseAnyExpression extends BaseExpression  {
	
	protected int currentVariant = 0;
	
	@Override
	public IValue getValue(IContinuation cont) throws EvaluationException {
		currentVariant = cont.popTrace();
		IEnvironment env = cont.getEnvironment();
		IValue r = getValue(env);
		currentVariant = 0;
		return r;
	}
}
