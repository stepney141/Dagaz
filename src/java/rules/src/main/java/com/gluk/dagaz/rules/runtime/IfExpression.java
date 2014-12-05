package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.api.rules.runtime.SystemIds;

public class IfExpression extends BaseExpression {

	public IfExpression() {
		super(SystemIds.IF_WORD);
	}

	public IValue getValue() throws RuntimeException {
		if ((args.size() < 2) || (args.size() > 3)) {
			throw new RuntimeException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		boolean r = args.get(0).getValue().getBoolean();
		if (r) {
			r = args.get(1).getValue().getBoolean();
		} else {
			if (args.size() == 3) {
				r = args.get(2).getValue().getBoolean();
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
