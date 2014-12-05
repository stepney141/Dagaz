package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.api.rules.runtime.SystemIds;

public class SeqExpression extends BaseExpression {

	public SeqExpression() {
		super(SystemIds.SEQ_WORD);
	}

	public IValue getValue() throws RuntimeException {
		boolean r = false;
		for (IExpression e: args) {
			r = e.getValue().getBoolean();
		}
		return ConstantExpression.createBoolean(r);
	}
}
