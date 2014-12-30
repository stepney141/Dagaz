package com.gluk.dagaz.rules.runtime;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IExpression;

public abstract class BaseExpression implements IExpression {
	
	protected IApplication app;
	protected List<IExpression> args = new ArrayList<IExpression>();
	
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
