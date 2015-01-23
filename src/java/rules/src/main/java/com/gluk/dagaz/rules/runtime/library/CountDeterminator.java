package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class CountDeterminator extends BaseDeterminator {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		long r = 0;
		try {
			args.get(0).getValue(env);
			r++;
		} catch (CheckException  e) {
			// Do Nothing
		}
		if (env instanceof IContinuationSupport) {
			IContinuationSupport cs = getContinuationSupport();
			for (IContinuation cont = cs.getContinuation(); cont != null; cont = cs.getContinuation()) {
				try {
					args.get(0).getValue(cont);
					r++;
				} catch (CheckException  e) {
					// Do Nothing
				}
			}
		}
		return new ConstantValue(r);
	}
}
