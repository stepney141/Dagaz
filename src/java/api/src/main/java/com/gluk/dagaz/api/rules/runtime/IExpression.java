package com.gluk.dagaz.api.rules.runtime;

public interface IExpression {
	IValue getValue() throws RuntimeException;
	void addArgument(IExpression arg) throws RuntimeException;
	long getId();
}
