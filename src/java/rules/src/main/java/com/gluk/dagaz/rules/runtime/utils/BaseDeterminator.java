package com.gluk.dagaz.rules.runtime.utils;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.library.SeqExpression;

public class BaseDeterminator extends BaseExpression {
	
	protected IContinuationSupport cs = new ContinuationSupport();
	private SeqExpression seq = null;
	private boolean isStarted = true;
	
	protected IContinuation getContinuation(IEnvironment env) {
		IContinuation c = null;
		if (isStarted) {
			isStarted = false;
			c = new Continuation(env.getCopy());
		} else {
			c = cs.getContinuation();
			if (c == null) {
				isStarted = true;
			} else {
				c.setEnvironment(env.getCopy());
			}
		}
		return c;
	}
	
	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		env.addContinuationSupport(cs);
		IValue v = super.getValue(env);
		env.delContinuationSupport();
		return v;
	}
	
	@Override
	public void addArgument(IExpression arg) throws ParsingException {
		if (seq == null) {
			seq = new SeqExpression();
			super.addArgument(seq);
		}
		seq.addArgument(arg);
	}

	@Override
	public boolean isDeterminator() {
		return true;
	}
}
