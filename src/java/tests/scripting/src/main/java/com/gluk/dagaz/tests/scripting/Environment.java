package com.gluk.dagaz.tests.scripting;

import org.apache.log4j.Logger;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.ConstantValue;

public class Environment implements IEnvironment {

    private static final Logger LOGGER = Logger.getLogger(Environment.class);
    
    private IValue value = null;

    public Environment(long value) {
    	this.value = new ConstantValue(value);
    }
    
    public Environment() {}

    public IValue getValue(String name, boolean isQuoted) throws ValueNotFoundException {
    	if (value != null) {
    		return value;
    	}
		throw new ValueNotFoundException("Unimplemented");
	}

	public void letValue(String name, IValue value) throws EvaluationException {}

	public void setValue(String name, IValue value) throws EvaluationException {
		LOGGER.debug(value.getString());
	}

	public void openFrame() {}

	public void closeFrame() throws EvaluationException {}

	public void setScore(int score, long priority) {}

	public boolean isContinuationsSupported() {
		return false;
	}

	public void pushTrace(int ix) {}

	public void popTrace() {}

	@Override
	public void addContinuation() throws EvaluationException {
		throw new EvaluationException("Unimplemented");
	}
}
