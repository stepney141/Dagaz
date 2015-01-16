package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class BaseDeterminator extends BaseExpression implements IEnvironment, IContinuationSupport {
	
	private IEnvironment env = null;
	private IContinuationSupport cs = new ContinuationSupport();
	private boolean isContinuationsNeeded = false;
	
	@Override
	public boolean isContinuationsSupported() {
		return true;
	}

	protected IContinuationSupport getContinuationSupport() throws EvaluationException {
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
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.size() < 1) {
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
	public void pushTrace(int ix) {
		if (env.isContinuationsSupported()) {
			cs.pushTrace(ix);
		}
	}

	@Override
	public void popTrace() {
		if (env.isContinuationsSupported()) {
			cs.popTrace();
		}
	}

	@Override
	public void addContinuation(IEnvironment env) throws EvaluationException {
		cs.addContinuation(env);
	}

	@Override
	public void pushValue(IValue v) {
		isContinuationsNeeded = true;
	}

	@Override
	public void popValue() {}

	@Override
	public IContinuation getContinuation() {
		return cs.getContinuation();
	}

	@Override
	public IValue getValue(String name, boolean isQuoted) throws ValueNotFoundException {
		return env.getValue(name, isQuoted);
	}

	@Override
	public void letValue(String name, IValue value) throws EvaluationException {
		env.letValue(name, value);
	}

	@Override
	public void setValue(String name, IValue value) throws EvaluationException {
		env.setValue(name, value);
	}

	@Override
	public void openFrame() {
		env.openFrame();
	}

	@Override
	public void closeFrame() throws EvaluationException {
		env.closeFrame();
	}

	@Override
	public void setScore(int score, long priority) {
		env.setScore(score, priority);
	}

	@Override
	public IEnvironment getCopy() {
		return env;
	}

	@Override
	public void clear() {
		cs = (IContinuationSupport)env;
		env.clear();
	}
}
