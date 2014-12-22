package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;

public interface IEnvironment {
	IValue getValue(String name) throws EvaluationException;
	void setValue(String name, IValue value) throws EvaluationException;
	void openFrame();
	void closeFrame() throws EvaluationException;
}
