package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class AndExpression extends BaseExpression {

	public IValue getValue(IEnvironment env) throws RuntimeException {
		boolean r = true;
		for (IExpression e: args) {
			if (!e.getValue(env).getBoolean()) {
				r = false;
				break;
			}
		}
		return ConstantExpression.createBoolean(r);
	}
}
