package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;

public interface IContinuationSupport {
	void          addValue(int ix);
	void          setValue(int ix, IValue v);
	void          addContinuation(IEnvironment env) throws EvaluationException;
	IContinuation getContinuation();
}
