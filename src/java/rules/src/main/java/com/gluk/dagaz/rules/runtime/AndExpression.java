package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.api.rules.runtime.SystemIds;

public class AndExpression extends BaseExpression {

	public AndExpression() {
		super(SystemIds.AND_WORD);
	}

	public IValue getValue() throws RuntimeException {
		boolean r = true;
		for (IExpression e: args) {
			if (!e.getValue().getBoolean()) {
				r = false;
				break;
			}
		}
		return ConstantExpression.createBoolean(r);
	}
}
