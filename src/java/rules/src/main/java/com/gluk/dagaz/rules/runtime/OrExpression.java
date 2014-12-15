package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class OrExpression extends BaseExpression {

	public IValue getValue(IEnvironment env) throws EvaluationException {
		boolean r = false;
		for (IExpression e: args) {
			try {
				if (e.getValue(env).getBoolean()) {
					r = true;
					break;
				}
			} catch (CheckException ex) {
				// Do nothing
			}
		}
		return ConstantExpression.createBoolean(r);
	}
}
