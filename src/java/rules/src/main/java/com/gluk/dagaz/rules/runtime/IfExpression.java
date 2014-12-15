package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class IfExpression extends BaseExpression {

	public IValue getValue(IEnvironment env) throws EvaluationException {
		if ((args.size() < 2) || (args.size() > 3)) {
			throw new RuntimeException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		boolean r = args.get(0).getValue(env).getBoolean();
		if (r) {
			r = args.get(1).getValue(env).getBoolean();
		} else {
			if (args.size() == 3) {
				r = args.get(2).getValue(env).getBoolean();
			}
		}
		return ConstantExpression.createBoolean(r);
	}

	public void addArgument(IExpression arg) throws RuntimeException {
		if (args.size() == 3) {
			throw new RuntimeException("Bad arity");
		}
		super.addArgument(arg);
	}
}
