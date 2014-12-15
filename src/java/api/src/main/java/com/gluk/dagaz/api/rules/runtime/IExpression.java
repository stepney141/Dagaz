package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;

public interface IExpression {
	IValue getValue(IEnvironment env) throws EvaluationException;
	void addArgument(IExpression arg) throws EvaluationException;
}
