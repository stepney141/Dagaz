package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class CountDeterminator extends BaseDeterminator {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		long r = 0;
		try {
			for (IExpression e: args) {
				e.getValue(env);
			}
			r++;
		} catch (CheckException  e) {
			// Do Nothing
		}
		if (env instanceof IContinuationSupport) {
			IContinuationSupport cs = (IContinuationSupport)env;
			for (IContinuation cont = cs.getContinuation(); cont != null; cont = cs.getContinuation()) {
				try {
					for (IExpression e: args) {
						e.getValue(cont);
					}
					r++;
				} catch (CheckException  e) {
					// Do Nothing
				}
			}
		}
		return new ConstantValue(r);
	}
}
