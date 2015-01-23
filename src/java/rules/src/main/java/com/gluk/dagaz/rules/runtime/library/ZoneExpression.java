package com.gluk.dagaz.rules.runtime.library;

import java.util.List;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class ZoneExpression extends BaseAnyExpression {

	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.size() != 1) {
			throw new EvaluationException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		String name = args.get(0).getValue(env).getString();
		List<String> positions = env.getPositions(name);
		if (currentVariant >= positions.size()) {
			throw new CheckException("No Variants");
		}
		addContinuation(env, positions.size());
		return env.getValue(positions.get(currentVariant), false);
	}

	@Override
	public void addArgument(IExpression arg) throws ParsingException {
		if (args.size() == 1) {
			throw new ParsingException("Bad arity");
		}
		super.addArgument(arg);
	}
}
