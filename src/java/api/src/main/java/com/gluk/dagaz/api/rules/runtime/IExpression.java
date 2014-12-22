package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.EvaluationException;

public interface IExpression {
	void setApplication(IApplication app);
	IValue getValue(IEnvironment env) throws EvaluationException;
	void addArgument(IExpression arg) throws EvaluationException;
	boolean isConstant();
}
