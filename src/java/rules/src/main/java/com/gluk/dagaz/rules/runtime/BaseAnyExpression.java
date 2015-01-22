package com.gluk.dagaz.rules.runtime;

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
				cs.pushTrace(0);
				cs.pushTrace(currentVariant + 1);
				cs.popTrace();
				cs.addContinuation(env);
				cs.popTrace();
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
}
