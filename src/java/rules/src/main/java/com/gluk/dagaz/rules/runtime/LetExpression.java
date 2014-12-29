package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class LetExpression extends BaseExpression {

	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.size() != 2) {
			throw new EvaluationException("Bad arity");
		}
		String name = args.get(0).getValue(env).getString();
		IValue value = args.get(1).getValue(env);
		env.letValue(name, value);
		return value;
	}

	@Override
	public void addArgument(IExpression arg) throws ParsingException {
		if (args.size() == 2) {
			throw new ParsingException("Bad arity");
		}
		super.addArgument(arg);
	}

	@Override
	public boolean isQuoted(int ix, String name) {
		return (ix == 0);
	}
}
