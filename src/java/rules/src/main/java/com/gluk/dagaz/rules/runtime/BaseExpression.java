package com.gluk.dagaz.rules.runtime;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.rules.runtime.IExpression;

public abstract class BaseExpression implements IExpression {
	
	protected long wordId;
	protected List<IExpression> args = new ArrayList<IExpression>();
	
	public BaseExpression(long wordId) {
		this.wordId = wordId;
	}
	
	public void addArgument(IExpression arg) throws RuntimeException {
		args.add(arg);
	}

	public long getId() {
		return wordId;
	}
}
