package com.gluk.dagaz.api.rules.functions;

import com.gluk.dagaz.api.exceptions.CriticalException;

public interface IFunctionManager {
	void      addFunction(String name, IFunction code);
	IFunction getFunction(String name) throws CriticalException;
}
