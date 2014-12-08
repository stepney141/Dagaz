package com.gluk.dagaz.rules.runtime;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.rules.runtime.IExpression;

public abstract class BaseExpression implements IExpression {
	
	protected List<IExpression> args = new ArrayList<IExpression>();
	
	public void addArgument(IExpression arg) throws RuntimeException {
		args.add(arg);
	}
}
