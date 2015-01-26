package com.gluk.dagaz.rules.runtime.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class ContinuationSupport implements IContinuationSupport {

	private List<CallFrame> trace = new ArrayList<CallFrame>(); 
	private Stack<IContinuation> continuations = new Stack<IContinuation>(); 

	@Override
	public void addValue(int ix) {
		if (!trace.isEmpty()) {
			CallFrame f = trace.get(trace.size() - 1);
			f.setCurrent(ix);
		}
		trace.add(trace.size(), new CallFrame());
	}

	@Override
	public void setValue(int ix, IValue v) {
		if (!trace.isEmpty()) {
			trace.remove(trace.size() - 1);
		}
		if (!trace.isEmpty() && (ix >= 0)) {
			CallFrame f = trace.get(trace.size() - 1);
			f.setValue(ix, v);
		}
	}
	
	@Override
	public void addContinuation(IEnvironment env) throws EvaluationException {
		// DEBUG:
//		if (continuations.isEmpty()) {
			IContinuation c = new Continuation(env, trace);
			continuations.push(c);
//		}
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
			c.setOffset(trace.size());
			return c;
		}
	}
}
