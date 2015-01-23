package com.gluk.dagaz.rules.runtime.library;

import java.util.List;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class AnyPositionExpression extends BaseAnyExpression {
	

	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		List<String> positions = null;
		if (args.isEmpty()) {
			positions = env.getPositions();
			if (positions.isEmpty()) {
				throw new CheckException("No Variants");
			}
			addContinuation(env, positions.size());
			return env.getValue(positions.get(currentVariant), false);
		}
		addContinuation(env, args.size());
		return args.get(currentVariant).getValue(env);
	}
	
	@Override
	public void addArgument(IExpression arg) throws ParsingException {
		IExpression zone = new ZoneExpression();
		zone.addArgument(arg);
		super.addArgument(zone);
	}
}
