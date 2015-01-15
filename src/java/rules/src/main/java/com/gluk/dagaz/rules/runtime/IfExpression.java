package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class IfExpression extends BaseExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		if ((args.size() < 2) || (args.size() > 3)) {
			throw new EvaluationException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		IValue r = args.get(0).getValue(env);
		if (r.getBoolean()) {
			r = args.get(1).getValue(env);
		} else {
			if (args.size() == 3) {
				r = args.get(2).getValue(env);
			}
		}
		return r;
	}

	@Override
	public void addArgument(IExpression arg) throws ParsingException {
		if (args.size() == 3) {
			throw new ParsingException("Bad arity");
		}
		super.addArgument(arg);
	}
}
