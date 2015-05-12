package com.gluk.dagaz.api.rules.functions;

import java.util.List;

import com.gluk.dagaz.api.exceptions.CriticalException;
import com.gluk.dagaz.api.rules.runtime.IExpression;

public interface IFunction {
	IExpression  getCode();
	void         addArgument(String name) throws CriticalException;
	List<String> getArguments();
}
