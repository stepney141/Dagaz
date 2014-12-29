package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;

public interface IExpression {
	void setApplication(IApplication app);
	IValue getValue(IEnvironment env) throws EvaluationException;
	void addArgument(IExpression arg) throws ParsingException;
	boolean isConstant();
	boolean isQuoted(int ix, String name);
	void setPriority(long priority) throws ParsingException;
}
