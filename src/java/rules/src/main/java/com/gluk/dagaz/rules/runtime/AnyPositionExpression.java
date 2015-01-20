package com.gluk.dagaz.rules.runtime;

import java.util.List;

import com.gluk.dagaz.api.exceptions.CheckException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class AnyPositionExpression extends BaseAnyExpression {
	
	List<String> positions = null;

	@Override
	public IValue getValue(IEnvironment env) throws EvaluationException {
		if (args.isEmpty()) {
			if (positions == null) {
				positions = env.getPositions();
			}
			if (positions.isEmpty()) {
				throw new CheckException("No Variants");
			}
			if (env instanceof IContinuationSupport) {
				IContinuationSupport cs = (IContinuationSupport)env;
				if (currentVariant + 1 < positions.size()) {
					cs.pushTrace(currentVariant + 1);
					cs.addContinuation(env);
					cs.popTrace();
				}
			}
			return env.getValue(positions.get(currentVariant), false);
		}
		if (env instanceof IContinuationSupport) {
			IContinuationSupport cs = (IContinuationSupport)env;
			if (currentVariant + 1 < args.size()) {
				cs.pushTrace(currentVariant + 1);
				cs.addContinuation(env);
				cs.popTrace();
			}
		}
		return args.get(currentVariant).getValue(env);
	}
	
	@Override
	public void clear() {
		positions = null;
		super.clear();
	}
	
	@Override
	public void addArgument(IExpression arg) throws ParsingException {
		IExpression zone = new ZoneExpression();
		zone.addArgument(arg);
		super.addArgument(zone);
	}
}
