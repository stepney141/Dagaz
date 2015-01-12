package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class ConstantExpression extends BaseExpression {
	
	private ConstantValue value;
	
	public ConstantExpression(String value) {
		this.value = new ConstantValue(value);
	}
	
	public ConstantExpression(long value) {
		this.value = new ConstantValue(value);
	}

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		return value;
	}

	@Override
	public void addArgument(IExpression arg) throws EvaluationException {
		throw new EvaluationException("Bad arity");
	}

	@Override
	public boolean isConstant() {
		return true;
	}
}
