package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;

public interface IExpression {
	void    setApplication(IApplication app);
	IValue  getValue(IEnvironment env) throws EvaluationException;
	IValue  getValue(IContinuation cont) throws EvaluationException;
	void    addArgument(IExpression arg) throws ParsingException;
	boolean isConstant();
	void    setQuoted();
	boolean isQuoted(int ix);
	void    setPriority(long priority) throws ParsingException;
	void    setOrder(int order);
	void    setCache(IValue v);
	void    clearCache();
}
