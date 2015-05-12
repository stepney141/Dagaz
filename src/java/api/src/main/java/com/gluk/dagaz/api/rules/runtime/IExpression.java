package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;

public interface IExpression {
	void    addArgument(IExpression arg) throws ParsingException;
	IValue  getValue(IEnvironment env) throws EvaluationException;
	IValue  getValue(IContinuation cont) throws EvaluationException;
	
	void    setApplication(IApplication app);
	boolean isConstant();
	boolean isNoCaching();
	boolean isDeterminator();
	void    setQuoted();
	boolean isQuoted(int ix);
	void    setPriority(long priority) throws ParsingException;
	void    noCaching();
	void    setParent(IExpression e);
}
