package com.gluk.dagaz.rules.runtime.utils;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public abstract class BaseExpression implements IExpression {
	
    protected IApplication app;
	protected List<IExpression> args = new ArrayList<IExpression>();
	
	protected IValue eval(IEnvironment env) throws EvaluationException {
		throw new EvaluationException("Not Implemented");
	}
	
	public IValue getValue(IEnvironment env) throws EvaluationException {
		IValue v = null;
		IContinuationSupport cs = env.getContinuationSupport();
		if (cs != null) {
			cs.enter(this);
			IContinuation c = env.getContinuation();
			v = c.getCachedValue(this, cs.getLevel(this));
		}
		if (v == null) {
			v = eval(env);
		}
		if (cs != null) {
			IContinuation c = env.getContinuation();
			c.cacheValue(this, cs.getLevel(this), v);
			cs.exit(this);
		}
		return v;
	}
	
	public IValue getValue(IContinuation cont) throws EvaluationException {
		IEnvironment env = cont.getEnvironment();
		env.pushContinuation(cont);
		IValue v = getValue(env);
		env.popContinuation();
		return v;
	}

	public void setApplication(IApplication app) {
		this.app = app;
	}

	public void addArgument(IExpression arg) throws ParsingException {
		args.add(arg);
	}
	
	public boolean isConstant() {
		return false;
	}
	
	public void setQuoted() {}

	public boolean isQuoted(int ix) {
		return false;
	}

	public void setPriority(long priority) throws ParsingException {
		throw new ParsingException("Bad option");
	}
}
