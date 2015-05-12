package com.gluk.dagaz.rules.runtime.utils;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.exceptions.CriticalException;
import com.gluk.dagaz.api.rules.functions.IFunction;
import com.gluk.dagaz.api.rules.runtime.IExpression;

public class Function implements IFunction {
	
	private IExpression expr;
	private List<String> params = new ArrayList<String>();
	
	public Function(IExpression expr) {
		this.expr = expr;
	}

	@Override
	public IExpression getCode() {
		return expr;
	}

	@Override
	public void addArgument(String name) throws CriticalException {
		if (params.contains(name)) {
			throw new CriticalException("Invalid parameters");
		}
		params.add(name);
	}

	@Override
	public List<String> getArguments() {
		return params;
	}
}
