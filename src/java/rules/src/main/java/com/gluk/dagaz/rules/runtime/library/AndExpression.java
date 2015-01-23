package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class AndExpression extends BaseExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		boolean r = true;
		try {
			for (IExpression e: args) {
				if (!e.getValue(env).getBoolean()) {
					r = false;
					break;
				}
			}
		} catch (ValueNotFoundException e) {
			r = false;
		}
		return ConstantValue.createBoolean(r);
	}
}
