package com.gluk.dagaz.api.rules.runtime;

import java.util.List;

import com.gluk.dagaz.api.exceptions.CriticalException;

public interface IFunction {
	IExpression getExpression();
	void addParameter(String name) throws CriticalException;
	List<String> getParameters();
}
