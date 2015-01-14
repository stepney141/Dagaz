package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class SeqExpression extends BaseExpression {

	protected IValue eval(IEnvironment env) throws EvaluationException {
		IValue r = null;
		for (IExpression e: args) {
			r = e.getValue(env);
		}
		return r;
	}
}
