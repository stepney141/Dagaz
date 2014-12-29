package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class SeqExpression extends BaseExpression {

	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.size() == 0) {
			throw new EvaluationException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		IValue r = null;
		for (IExpression e: args) {
			r = e.getValue(env);
		}
		return r;
	}
}
