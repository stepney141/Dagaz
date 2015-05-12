package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;

public interface IValue {
	boolean isList();
	boolean isBoolean();
	boolean isNumber();
	boolean getBoolean() throws EvaluationException;
	String  getString() throws EvaluationException;
	long    getLong() throws EvaluationException;
	int     getInt() throws EvaluationException;
}
