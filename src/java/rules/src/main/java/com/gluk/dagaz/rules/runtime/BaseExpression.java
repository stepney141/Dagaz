package com.gluk.dagaz.rules.runtime;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.rules.runtime.IExpression;

public abstract class BaseExpression implements IExpression {
	
	protected IApplication app;
	protected List<IExpression> args = new ArrayList<IExpression>();
	
	public void setApplication(IApplication app) {
		this.app = app;
	}

	public void addArgument(IExpression arg) throws RuntimeException {
		args.add(arg);
	}
	
	public boolean isConstant() {
		return false;
	}
}
