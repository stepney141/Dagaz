package com.gluk.dagaz.rules.runtime.library;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.runtime.utils.ConstantValue;

public class CommentExpression extends BaseExpression {
	
	private final static String COMMENT_NAME = "move.comment";

	@Override
	protected IValue eval(IEnvironment env) throws EvaluationException {
		for (IExpression e: args) {
			env.setValue(COMMENT_NAME, e.getValue(env));
		}
		return ConstantValue.createBoolean(true);
	}
}
