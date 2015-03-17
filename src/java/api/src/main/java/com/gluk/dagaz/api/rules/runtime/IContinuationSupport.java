package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;

public interface IContinuationSupport {
	long getLevel(IExpression e) throws EvaluationException;
	void enter(IExpression e);
	void exit(IExpression e) throws EvaluationException;
	void addContinuation(IContinuation c);
	IContinuation getContinuation();
	void clearContinuations();
}
