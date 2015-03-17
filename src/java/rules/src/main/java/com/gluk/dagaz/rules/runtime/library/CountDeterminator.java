package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.BaseDeterminator;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class CountDeterminator extends BaseDeterminator {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		long r = 0;
		for (IContinuation c = getContinuation(env); c != null; c = getContinuation(env)) {
			try {
				args.get(0).getValue(c);
				r++;
			} catch (CheckException ex) {
				// Do Nothing
			}
		}
		return new ConstantValue(r);
	}
}
