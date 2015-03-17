package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.BaseAnyExpression;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class AnyRangeExpression extends BaseAnyExpression {
	
	private long minValue;
	private long maxValue;

	@Override
	protected IValue eval(IEnvironment env, int index) throws EvaluationException {
		return new ConstantValue(minValue + index);
	}
	
	@Override
	protected boolean isValidIndex(int index) {
		return minValue + index <= maxValue;
	}

	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.size() != 2) {
			throw new EvaluationException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		minValue = args.get(0).getValue(env).getLong();
		maxValue = args.get(1).getValue(env).getLong();
		if (minValue > maxValue) {
			throw new CheckException("No Variants");
		}
		return super.eval(env);
	}

	@Override
	public void addArgument(IExpression arg) throws ParsingException {
		if (args.size() == 2) {
			throw new ParsingException("Bad arity");
		}
		super.addArgument(arg);
	}
}
