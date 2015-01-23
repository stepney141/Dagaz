package com.gluk.dagaz.rules.runtime.library;

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
	protected int order = 0;
	
	private IValue cache = null;
	
	protected IValue eval(IEnvironment env) throws EvaluationException {
		throw new EvaluationException("Not Implemented");
	}
	
	@Override
	public void setCache(IValue v) {
		cache = v;
	}
	
	@Override
	public void setCache(int ix, IValue v) {
		args.get(ix).setCache(v);
	}
	
	@Override
	public void clearCache() {
		cache = null;
	}

	@Override
	public IValue getValue(IContinuation cont) throws EvaluationException {
		int ix = cont.useTrace(this);
		IExpression current = args.get(ix); 
		current.setCache(current.getValue(cont));
		IEnvironment env = cont.getEnvironment();
		IValue r = getValue(env);
		for (IExpression e: args) {
			e.clearCache();
		}
		return r;
	}
	
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (cache != null) {
			return cache;
		}
		if (env instanceof IContinuationSupport) {
			IContinuationSupport cs = (IContinuationSupport)env;
			cs.pushTrace(order);
		}
		IValue v = eval(env);
		if (env instanceof IContinuationSupport) {
			IContinuationSupport cs = (IContinuationSupport)env;
			cs.popTrace();
			cs.addValue(order, v);
		}
		return v;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public void setApplication(IApplication app) {
		this.app = app;
	}

	public void addArgument(IExpression arg) throws ParsingException {
		arg.setOrder(args.size());
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
