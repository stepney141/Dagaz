package com.gluk.dagaz.tests.scripting;

import org.apache.log4j.Logger;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class Environment implements IEnvironment {

    private static final Logger LOGGER = Logger.getLogger(Environment.class);

    public IValue getValue(String name, boolean isQuoted) throws ValueNotFoundException {
		throw new ValueNotFoundException("Unimplemented");
	}

	public void letValue(String name, IValue value) throws EvaluationException {}

	public void setValue(String name, IValue value) throws EvaluationException {
		LOGGER.debug(value.getString());
	}

	public void openFrame() {}

	public void closeFrame() throws EvaluationException {}

	public void setScore(int score, long priority) {}
}
