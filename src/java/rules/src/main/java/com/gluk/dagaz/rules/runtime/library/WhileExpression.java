package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class WhileExpression extends BaseExpression {

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		if (args.size() < 2) {
			throw new EvaluationException("Bad arity [" + Integer.toString(args.size()) + "]");
		}
		boolean r = false;
		boolean c = true;
		while (c) {
			boolean f = false;
			for (IExpression e: args) {
				boolean v = e.getValue(env).getBoolean();
				if (f) {
					r = v;
				} else {
					if (!v) {
						c = false;
						break;
					}
				}
				f = true;
			}
		}
		return ConstantValue.createBoolean(r);
	}
}
