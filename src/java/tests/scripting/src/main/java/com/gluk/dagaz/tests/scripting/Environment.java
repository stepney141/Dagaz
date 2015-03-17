package com.gluk.dagaz.tests.scripting;

import java.util.List;

import org.apache.log4j.Logger;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class Environment implements IEnvironment {

    private static final Logger LOGGER = Logger.getLogger(Environment.class);
    
    private IValue value = null;

    public Environment(long value) {
    	this.value = new ConstantValue(value);
    }
    
    public Environment() {}

	@Override
    public IValue getValue(String name, boolean isQuoted) throws ValueNotFoundException {
    	if (value != null) {
    		return value;
    	}
		throw new ValueNotFoundException("Unimplemented");
	}

	@Override
	public IValue getValue(String name) throws ValueNotFoundException {
		return getValue(name, false);
	}

	@Override
	public void letValue(String name, IValue value) throws EvaluationException {}

	@Override
	public void setValue(String name, IValue value) throws EvaluationException {
		LOGGER.debug(value.getString());
	}

	@Override
	public void openFrame() {}

	@Override
	public void closeFrame() throws EvaluationException {}

	@Override
	public void setScore(int score, long priority) {}

	@Override
	public IEnvironment getCopy() {
		return this;
	}

	@Override
	public List<String> getPositions(String zone) throws EvaluationException {
		throw new EvaluationException("Unimplemented");
	}

	@Override
	public List<String> getPositions() throws EvaluationException {
		throw new EvaluationException("Unimplemented");
	}

	@Override
	public IContinuationSupport getContinuationSupport() {
		return null;
	}

	@Override
	public void addContinuationSupport(IContinuationSupport cs) {}

	@Override
	public void delContinuationSupport() {}

	@Override
	public IContinuation getContinuation() {
		return null;
	}

	@Override
	public void pushContinuation(IContinuation cont) {}

	@Override
	public void popContinuation() {}
}
