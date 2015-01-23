package com.gluk.dagaz.rules.runtime.utils;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.exceptions.CriticalException;
import com.gluk.dagaz.api.rules.runtime.IFunction;
import com.gluk.dagaz.api.rules.runtime.IFunctionList;

public class FunctionList implements IFunctionList {
	
	private Map<String, IFunction> funcs = new HashMap<String, IFunction>();

	@Override
	public void addFunction(String name, IFunction f) {
		StringBuffer sb = new StringBuffer();
		sb.append(name);
		sb.append('@');
		sb.append(Integer.toString(f.getParameters().size()));
		funcs.put(sb.toString(), f);
	}

	@Override
	public IFunction getFunction(String name) throws CriticalException {
		IFunction f = funcs.get(name);
		if (f == null) {
			throw new CriticalException("Function " + name + " not found");
		}
		return f;
	}
}
