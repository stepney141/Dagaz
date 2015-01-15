package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;

public interface IContinuationSupport {
	boolean       isContinuationsSupported();
	void          pushValue(IValue v);
	void          popValue();
	void          pushTrace(int ix);
	void          popTrace();
	void          addContinuation() throws EvaluationException;
	IContinuation getContinuation();
}
