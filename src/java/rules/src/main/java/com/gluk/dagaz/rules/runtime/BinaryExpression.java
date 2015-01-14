package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public abstract class BinaryExpression extends BaseExpression {

	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.size() != 2) {
			throw new EvaluationException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		return super.getValue(env);
	}
	
	public void addArgument(IExpression arg) throws ParsingException {
		if (args.size() == 2) {
			throw new ParsingException("Bad arity");
		}
		super.addArgument(arg);
	}
}
