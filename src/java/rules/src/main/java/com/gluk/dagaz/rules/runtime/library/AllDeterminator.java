package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.BaseDeterminator;

public class AllDeterminator extends BaseDeterminator {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		IValue r = null;
		for (IContinuation c = getContinuation(env); c != null; c = getContinuation(env)) {
			try {
				r = args.get(0).getValue(c);
			} catch (CheckException ex) {
				// Do Nothing
			}
		}
		if (r == null) {
			throw new CheckException("No variants");
		}
		return r;
	}
}
