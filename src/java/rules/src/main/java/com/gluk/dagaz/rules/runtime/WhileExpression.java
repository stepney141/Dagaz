package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.api.rules.runtime.SystemIds;

public class WhileExpression extends BaseExpression {

	public WhileExpression() {
		super(SystemIds.WHILE_WORD);
	}

	public IValue getValue() throws RuntimeException {
		if (args.size() < 2) {
			throw new RuntimeException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		boolean r = false;
		boolean c = true;
		while (c) {
			boolean f = false;
			for (IExpression e: args) {
				boolean v = e.getValue().getBoolean();
				if (f) {
					r = v;
				} else {
					if (!v) {
						c = false;
						break;
					}
				}
				f = true;
			}
		}
		return ConstantExpression.createBoolean(r);
	}
}
