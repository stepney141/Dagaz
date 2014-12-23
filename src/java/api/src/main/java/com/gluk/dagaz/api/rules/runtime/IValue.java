package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;

public interface IValue {
	boolean isList();
	boolean isBoolean();
	boolean isNumber();
	String getString() throws EvaluationException;
	boolean getBoolean() throws EvaluationException;
	long getLong() throws EvaluationException;
}
