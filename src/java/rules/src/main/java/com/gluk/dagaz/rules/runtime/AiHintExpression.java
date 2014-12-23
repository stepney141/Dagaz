package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class AiHintExpression extends BaseExpression {

	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		StringBuffer sb = new StringBuffer();
		for (IExpression e: args) {
			sb.append(e.getValue(env).getString());
		}
		IValue value = new ConstantValue(sb.toString());
		env.addAiHint(IEnvironment.COMMENT_AI_HINT, value);
		return value;
	}
}
