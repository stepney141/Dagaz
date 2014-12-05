package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.api.rules.runtime.SystemIds;

public class OrExpression extends BaseExpression {

	public OrExpression() {
		super(SystemIds.OR_WORD);
	}

	public IValue getValue() throws RuntimeException {
		boolean r = false;
		for (IExpression e: args) {
			if (e.getValue().getBoolean()) {
				r = true;
				break;
			}
		}
		return ConstantExpression.createBoolean(r);
	}
}
