package com.gluk.dagaz.rules.runtime.utils;

import java.util.List;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.library.SeqExpression;

public class BaseDeterminator extends BaseExpression implements IEnvironment, IContinuationSupport {
	
	private IEnvironment env = null;
	private IContinuationSupport cs = new ContinuationSupport();
	private boolean isContinuationsNeeded = false;
	
	private void checkEnv() throws EvaluationException {
		if (env == null) {
			throw new EvaluationException("Environment not initialized");
		}
	}

	protected IContinuationSupport getContinuationSupport() throws EvaluationException {
		checkEnv();
		IContinuationSupport cs = (IContinuationSupport)env;
		if (env.isContinuationsSupported()) {
			return cs;
		} else {
			if (isContinuationsNeeded) {
				throw new EvaluationException("Continuations are not supported");
			}
			return this;
		}
	}

	@Override
	public void addArgument(IExpression arg) throws ParsingException {
		IExpression e = null;
		if (args.isEmpty()) {
			e = new SeqExpression();
			super.addArgument(e);
		} else {
			e = args.get(0);
		}
		e.addArgument(arg);
	}
	
	@Override
	public boolean isContinuationsSupported() {
		return true;
	}
	
	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.size() != 1) {
			throw new EvaluationException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		this.env = env;
		if (env instanceof IContinuationSupport) {
			if (!env.isContinuationsSupported()) {
				env = this;
			}
		}
		return super.getValue(env);
	}

	@Override
	public void addValue(int ix) {
		cs.addValue(ix);
	}

	@Override
	public void setValue(int ix, IValue v) {
		cs.setValue(ix, v);
	}

	@Override
	public void addContinuation(IEnvironment env) throws EvaluationException {
		cs.addContinuation(env);
	}

	@Override
	public IContinuation getContinuation() {
		return cs.getContinuation();
	}

	@Override
	public IValue getValue(String name, boolean isQuoted) throws ValueNotFoundException {
		checkEnv();
		return env.getValue(name, isQuoted);
	}

	@Override
	public void letValue(String name, IValue value) throws EvaluationException {
		checkEnv();
		env.letValue(name, value);
	}

	@Override
	public void setValue(String name, IValue value) throws EvaluationException {
		checkEnv();
		env.setValue(name, value);
	}

	@Override
	public void openFrame() {
		checkEnv();
		env.openFrame();
	}

	@Override
	public void closeFrame() throws EvaluationException {
		checkEnv();
		env.closeFrame();
	}

	@Override
	public void setScore(int score, long priority) {
		checkEnv();
		env.setScore(score, priority);
	}

	@Override
	public IEnvironment getCopy() {
		return this;
	}

	@Override
	public List<String> getPositions(String zone) {
		checkEnv();
		return env.getPositions(zone);
	}

	@Override
	public List<String> getPositions() {
		checkEnv();
		return env.getPositions();
	}
}
