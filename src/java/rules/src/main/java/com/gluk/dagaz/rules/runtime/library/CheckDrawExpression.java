package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.BaseExpression;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class CheckDrawExpression extends BaseExpression {

	private long priority = 0;

	@Override
	public void setPriority(long priority) throws ParsingException {
		this.priority = priority;
	}

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		if (args.size() != 1) {
			throw new EvaluationException("Bad arity");
		}
		boolean r = args.get(0).getValue(env).getBoolean();
		if (r) {
			env.setScore(IEnvironment.DRAW_SCORE, priority);
		}
		return ConstantValue.createBoolean(r);
	}

	@Override
	public void addArgument(IExpression arg) throws ParsingException {
		if (args.size() == 1) {
			throw new ParsingException("Bad arity");
		}
		super.addArgument(arg);
	}
}
