package com.gluk.dagaz.api.rules.runtime;

public interface IContinuation {
	IEnvironment getEnvironment();
	int          useTrace(IExpression e);
	int          getLevel();
	void         setOffset(int offset);
}
