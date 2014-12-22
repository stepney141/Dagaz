package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.exceptions.ParsingException;

public interface IExpressionFactory {
	IExpression createExpression(String name) throws ParsingException;
	IExpression createExpression(IExpression expr) throws ParsingException;
}
