package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.BaseAnyExpression;

public class AnyExpression extends BaseAnyExpression {
	
	@Override
	protected IValue eval(IEnvironment env, int index) throws EvaluationException {
		return args.get(index).getValue(env);
	}
	
	@Override
	protected boolean isValidIndex(int index) {
		return index < args.size();
	}

	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.isEmpty()) {
			throw new CheckException("No Variants");
		}
		return super.eval(env);
	}
}
