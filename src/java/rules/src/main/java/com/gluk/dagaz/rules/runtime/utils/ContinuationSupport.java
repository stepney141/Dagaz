package com.gluk.dagaz.rules.runtime.utils;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IExpression;

public class ContinuationSupport implements IContinuationSupport {
	
	private Map<IExpression, Long> exps = new HashMap<IExpression, Long>(); 

	@Override
	public long getLevel(IExpression e) throws EvaluationException {
		Long v = exps.get(e);
		if (v == null) {
			throw new EvaluationException("Expression not found");
		}
		return v;
	}

	@Override
	public void enter(IExpression e) {
		Long v = exps.get(e);
		if (v == null) {
			v = new Long(0L);
			exps.put(e, v);
		}
		v++;
	}

	@Override
	public void exit(IExpression e) throws EvaluationException {
		Long v = exps.get(e);
		if (v == null) {
			throw new EvaluationException("Expression not found");
		}
		v--;
	}
}
