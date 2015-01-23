package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class GetExpression extends BaseExpression {
	
	private String name;
	private boolean isQuoted = false;
	
	public GetExpression(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		return env.getValue(name, isQuoted);
	}

	@Override
	public void addArgument(IExpression arg) throws EvaluationException {
		throw new EvaluationException("Bad arity");
	}

	@Override
	public void setQuoted() {
		this.isQuoted = true;
	}
}
