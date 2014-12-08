package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class WhileExpression extends BaseExpression {

	public IValue getValue(IEnvironment env) throws RuntimeException {
		if (args.size() < 2) {
			throw new RuntimeException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		boolean r = false;
		boolean c = true;
		while (c) {
			boolean f = false;
			for (IExpression e: args) {
				boolean v = e.getValue(env).getBoolean();
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
