package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;

public interface IContinuationSupport {
	void          pushTrace(int ix);
	void          popTrace();
	void          addValue(int ix, IValue v);
	void          setValues(IExpression e);
	void          addContinuation(IEnvironment env) throws EvaluationException;
	IContinuation getContinuation();
}
