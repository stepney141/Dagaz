package com.gluk.dagaz.rules.runtime;

import java.util.Stack;

import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class Continuation implements IContinuation {
	
	private IEnvironment   env;
	private Stack<Integer> trace = new Stack<Integer>();
	private Stack<IValue> values = new Stack<IValue>(); 
	
	public Continuation(IEnvironment env, Stack<Integer> trace, Stack<IValue> values) {
		this.env = env.getCopy();
		while (!trace.isEmpty()) {
			Integer x = trace.pop();
			this.trace.push(x);
		}
		while (!values.isEmpty()) {
			IValue x = values.pop();
			this.values.push(x);
		}
	}
	
	@Override
	public IEnvironment getEnvironment() {
		return env;
	}

	@Override
	public int popTrace() {
		return trace.pop();
	}

	@Override
	public IValue popValue() {
		return values.pop();
	}

	@Override
	public int getLevel() {
		return trace.size();
	}
}
