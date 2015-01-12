package com.gluk.dagaz.rules.runtime;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public abstract class BaseExpression implements IExpression {
	
	protected IApplication app;
	protected List<IExpression> args = new ArrayList<IExpression>();
	protected int order = 0;
	
	protected abstract IValue eval(IEnvironment env);
	
	public IValue getValue(IEnvironment env) throws EvaluationException {
		env.pushTrace(order);
		IValue v = eval(env);
		env.popTrace();
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
