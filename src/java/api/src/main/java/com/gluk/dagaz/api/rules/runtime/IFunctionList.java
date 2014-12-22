package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.exceptions.CriticalException;

public interface IFunctionList {
	void addFunction(String name, IFunction f);
	IFunction getFunction(String name) throws CriticalException;
}
