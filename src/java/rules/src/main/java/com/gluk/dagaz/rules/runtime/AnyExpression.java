package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class AnyExpression extends BaseAnyExpression {
	
	private final static String RANGE_NAME    = "_";
	
	private IExpression currentExpression = null;
	private boolean isRanged = false;
	
	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (currentExpression != null) {
			if (isRanged) {
				throw new EvaluationException("Bad Range");
			}
			try {
				super.addArgument(currentExpression);
			} catch (ParsingException e) {
				throw new EvaluationException(e.toString(), e);
			}
			currentExpression = null;
		}
		if (args.isEmpty()) {
			throw new CheckException("No Variants");
		}
		addContinuation(env, args.size());
		return args.get(currentVariant).getValue(env);
	}
	
	@Override
	public void addArgument(IExpression arg) throws ParsingException {
		if (arg instanceof GetExpression) {
			GetExpression e = (GetExpression)arg;
			if (e.getName().equals(RANGE_NAME)) {
				if (isRanged || (currentExpression == null)) {
					throw new ParsingException("Bad Range");
				}
				isRanged = true;
				return;
			}
		}
		if (isRanged && (currentExpression != null)) {
			IExpression range = new AnyRange();
			range.addArgument(currentExpression);
			range.addArgument(arg);
			super.addArgument(range);
			currentExpression = null;
			isRanged = false;
			return;
		}
		if (currentExpression != null) {
			super.addArgument(currentExpression);
		}
		currentExpression = arg;
		isRanged = false;
	}
}
