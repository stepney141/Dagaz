package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class NotExpression extends BaseExpression {

	public IValue getValue(IEnvironment env) throws RuntimeException {
		if (args.size() != 1) {
			throw new RuntimeException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		return ConstantExpression.createBoolean(!args.get(0).getValue(env).getBoolean());
	}

	public void addArgument(IExpression arg) throws RuntimeException {
		if (args.size() == 1) {
			throw new RuntimeException("Bad arity");
		}
		super.addArgument(arg);
	}
}
