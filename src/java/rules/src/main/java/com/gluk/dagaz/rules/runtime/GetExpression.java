package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class GetExpression extends BaseExpression {
	
	private String name;
	
	public GetExpression(String name) {
		this.name = name;
	}

	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		return env.getValue(name);
	}

	@Override
	public void addArgument(IExpression arg) throws EvaluationException {
		throw new EvaluationException("Bad arity");
	}
}
