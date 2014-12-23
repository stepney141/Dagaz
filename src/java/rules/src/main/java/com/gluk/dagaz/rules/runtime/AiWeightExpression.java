package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class AiWeightExpression extends BaseExpression {

	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.size() == 1) {
			throw new EvaluationException("Bad arity");
		}
		IValue value = args.get(0).getValue(env);
		env.addAiHint(IEnvironment.WEIGHT_AI_HINT, value);
		return value;
	}

	@Override
	public void addArgument(IExpression arg) throws ParsingException {
		if (args.size() == 1) {
			throw new ParsingException("Bad arity");
		}
		super.addArgument(arg);
	}
}
