package com.gluk.dagaz.rules.runtime.utils;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public abstract class BaseAnyExpression extends BaseExpression  {
	
	protected int currentVariant = 0;
	
	protected void addContinuation(IEnvironment env, int maxValue) {
		if (env instanceof IContinuationSupport) {
			IContinuationSupport cs = (IContinuationSupport)env;
			if (currentVariant + 1 < maxValue) {
				cs.addValue(currentVariant + 1);
 				cs.setValue(-1, null);
				cs.addContinuation(env);
			}
		}
	}
	
	@Override
	public IValue getValue(IContinuation cont) throws EvaluationException {
		currentVariant = cont.useTrace(this);
		IEnvironment env = cont.getEnvironment();
		IValue r = getValue(env);
		currentVariant = 0;
		return r;
	}

	@Override
	public void setCache(int ix, IValue v) {}
}
