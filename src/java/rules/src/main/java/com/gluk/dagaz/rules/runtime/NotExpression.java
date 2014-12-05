package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.api.rules.runtime.SystemIds;

public class NotExpression extends BaseExpression {

	public NotExpression() {
		super(SystemIds.NOT_WORD);
	}

	public IValue getValue() throws RuntimeException {
		if (args.size() != 1) {
			throw new RuntimeException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		return ConstantExpression.createBoolean(!args.get(0).getValue().getBoolean());
	}

	public void addArgument(IExpression arg) throws RuntimeException {
		if (args.size() == 1) {
			throw new RuntimeException("Bad arity");
		}
		super.addArgument(arg);
	}
}
