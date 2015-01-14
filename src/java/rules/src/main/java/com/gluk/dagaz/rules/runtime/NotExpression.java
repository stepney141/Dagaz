package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class NotExpression extends UnaryExpression {

	protected IValue eval(IEnvironment env) throws EvaluationException {
		boolean r = true;
		try {
			r = !args.get(0).getValue(env).getBoolean();
		} catch (ValueNotFoundException e) {
			r = false;
		} catch (CheckException e) {
			// Do Nothing
		}
		return ConstantValue.createBoolean(r);
	}
}
