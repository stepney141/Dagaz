package com.gluk.dagaz.rules.runtime.utils;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public abstract class BaseAnyExpression extends BaseExpression {
	
	protected abstract IValue eval(IEnvironment env, int index) throws EvaluationException;
	protected abstract boolean isValidIndex(int index);

	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		IContinuationSupport cs = env.getContinuationSupport();
		if (cs == null) {
			throw new EvaluationException("Any without Determinator");
		}
		IContinuation c = env.getContinuation();
		if (c == null) {
			throw new EvaluationException("Internal Error");
		}
		cs.enter(this);
		int index = 0;
		IValue v = c.getCachedValue(this, cs.getLevel(this));
		if (v != null) {
			index = v.getInt();
		}
		IValue r = eval(env, index);
		index++;
		if (isValidIndex(index)) {
			c.cacheValue(this, cs.getLevel(this), new ConstantValue(index));
			cs.addContinuation(c);
		}
		cs.exit(this);
		return r;
	}
}
