package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class AllDeterminator extends BaseDeterminator {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		IValue r = null;
		try {
			r = args.get(0).getValue(env);
		} catch (CheckException  e) {
			// Do Nothing
		}
		if (env instanceof IContinuationSupport) {
			IContinuationSupport cs = getContinuationSupport();
			for (IContinuation cont = cs.getContinuation(); cont != null; cont = cs.getContinuation()) {
				try {
					r = args.get(0).getValue(cont);
				} catch (CheckException  e) {
					// Do Nothing
				}
			}
		}
		return r;
	}
}
