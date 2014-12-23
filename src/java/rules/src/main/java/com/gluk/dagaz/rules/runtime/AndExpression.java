package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class AndExpression extends BaseExpression {

	public IValue getValue(IEnvironment env) throws EvaluationException {
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
