package com.gluk.dagaz.api.rules.runtime;

public interface IContinuation {
	IEnvironment getEnvironment();
	void cacheValue(IExpression e, Long level, IValue v);
	IValue getCachedValue(IExpression e, Long level);
	void setEnvironment(IEnvironment env);
}
