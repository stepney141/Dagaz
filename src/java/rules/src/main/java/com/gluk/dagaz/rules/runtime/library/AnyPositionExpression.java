package com.gluk.dagaz.rules.runtime.library;

import java.util.List;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.BaseAnyExpression;

public class AnyPositionExpression extends BaseAnyExpression {

	private boolean isQuoted = false;
	List<String> positions;

	@Override
	protected IValue eval(IEnvironment env, int index) throws EvaluationException {
		if (index >= positions.size()) {
			throw new CheckException("No Variants");
		}
		String name = positions.get(index);
		return env.getValue(name, isQuoted);
	}

	@Override
	protected boolean isValidIndex(int index) {
		return index < positions.size();
	}
	
	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.isEmpty()) {
			positions = env.getPositions();
		} else {
			positions = env.getPositions(args.get(0).getValue(env).getString());
		}
		if (positions.isEmpty()) {
			throw new CheckException("No Variants");
		}
		return super.eval(env);
	}	

	@Override
	public void addArgument(IExpression arg) throws ParsingException {
		if (args.size() == 1) {
			throw new ParsingException("Bad arity");
		}
		arg.setQuoted();
		super.addArgument(arg);
	}

	@Override
	public void setQuoted() {
		this.isQuoted = true;
	}
}
