package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class AnyExpression extends BaseExpression {
	
	private final static String RANGE_NAME    = "_";
	
	private IExpression currentRange = null;
	private boolean isRanged = false;
	private int currentVariant = 0; // TODO: Сбрасывается при завершении обработки Continuation-а
	
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (currentRange != null) {
			if (isRanged) {
				throw new EvaluationException("Bad Range");
			}
			try {
				super.addArgument(currentRange);
			} catch (ParsingException e) {
				throw new EvaluationException(e.toString(), e);
			}
			currentRange = null;
		}
		if (args.isEmpty()) {
			throw new CheckException("No Variants");
		}
		if (currentVariant + 1 < args.size()) {
			env.pushTrace(currentVariant + 1);
			env.addContinuation();
			env.popTrace();
		}
		return args.get(currentVariant).getValue(env);
	}
	
	public void addArgument(IExpression arg) throws ParsingException {
		if (arg instanceof GetExpression) {
			GetExpression e = (GetExpression)arg;
			if (e.getName().equals(RANGE_NAME)) {
				if (isRanged) {
					throw new ParsingException("Bad Range");
				}
				isRanged = true;
				return;
			}
		}
		if (isRanged && (currentRange != null)) {
			currentRange.addArgument(arg);
			super.addArgument(currentRange);
			currentRange = null;
			isRanged = false;
			return;
		}
		if (currentRange != null) {
			super.addArgument(currentRange);
		}
		currentRange = new AnyRange();
		currentRange.addArgument(arg);
		isRanged = false;
	}
}
