package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.BaseExpression;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class OrExpression extends BaseExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		boolean r = false;
		try {
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
		} catch (ValueNotFoundException e) {
			r = false;
		}
		return ConstantValue.createBoolean(r);
	}
}
