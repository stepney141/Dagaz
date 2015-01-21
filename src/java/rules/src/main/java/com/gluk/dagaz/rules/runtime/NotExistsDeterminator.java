package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class NotExistsDeterminator extends ExistsDeterminator {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		boolean r = !super.eval(env).getBoolean();
		return ConstantValue.createBoolean(r);
	}
}
