package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.BaseDeterminator;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class ExistsDeterminator extends BaseDeterminator {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		boolean r = false;
		try {
			args.get(0).getValue(env);
			r = true;
		} catch (CheckException  e) {
			// Do Nothing
		}
		if (env instanceof IContinuationSupport) {
			IContinuationSupport cs = getContinuationSupport();
			for (IContinuation cont = cs.getContinuation(); cont != null; cont = cs.getContinuation()) {
				if (r) {
					break;
				}
				try {
					args.get(0).getValue(cont);
					r = true;
				} catch (CheckException  e) {
					// Do Nothing
				}
			}
		}
		return ConstantValue.createBoolean(r);
	}
}
