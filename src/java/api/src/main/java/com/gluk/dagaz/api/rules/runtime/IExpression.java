package com.gluk.dagaz.api.rules.runtime;

public interface IExpression {
	IValue getValue(IEnvironment env) throws RuntimeException;
	void addArgument(IExpression arg) throws RuntimeException;
}
