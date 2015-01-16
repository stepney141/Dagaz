package com.gluk.dagaz.rules.runtime;

import java.util.Stack;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class ContinuationSupport implements IContinuationSupport {

	private Stack<Integer> trace = new Stack<Integer>();
	private Stack<IValue> cached = new Stack<IValue>();
	private Stack<IContinuation> continuations = new Stack<IContinuation>(); 

	@Override
	public void pushTrace(int ix) {
		trace.push(ix);
	}

	@Override
	public void popTrace() {
		if (!trace.isEmpty()) {
			trace.pop();
		}
	}

	@Override
	public void pushValue(IValue v) {
		cached.push(v);
	}

	@Override
	public void popValue() {
		if (!cached.isEmpty()) {
			cached.pop();
		}
	}

	@Override
	public void addContinuation(IEnvironment env) throws EvaluationException {
		IContinuation c = new Continuation(env, trace, cached);
		continuations.push(c);
	}
	
	@Override
	public IContinuation getContinuation() {
		if (continuations.isEmpty()) {
			return null;
		} else {
			IContinuation c = continuations.pop();
			if (c.getLevel() <= trace.size()) {
				continuations.push(c);
				return null;
			}
			return c;
		}
	}
}
