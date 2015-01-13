package com.gluk.dagaz.rules.runtime;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.board.IBoardConfiguration;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class EnvironmentProxy implements IEnvironment {
	
	private IEnvironment env;
	private IBoardConfiguration board;
	
	private int deep = 0;
	private Map<String, ValueHolder> values = new HashMap<String, ValueHolder>();
	private boolean isContinuationsSupported = false;
	private Stack<Integer> trace = new Stack<Integer>(); 

	public EnvironmentProxy(IEnvironment env, IBoardConfiguration board, boolean isContinuationsSupported) {
		this.env   = env;
		this.board = board;
		this.isContinuationsSupported = isContinuationsSupported;
	}
	
	public EnvironmentProxy(IEnvironment env, IBoardConfiguration board) {
		this.env   = env;
		this.board = board;
	}
	
	@Override
	public boolean isContinuationsSupported() {
		return isContinuationsSupported;
	}

	@Override
	public void pushTrace(int ix) {
		if (isContinuationsSupported) {
			trace.push(ix);
		}
	}

	@Override
	public void popTrace() {
		if (isContinuationsSupported) {
			trace.pop();
		}
	}

	@Override
	public IValue getValue(String name, boolean isQuoted) throws ValueNotFoundException {
		if (isQuoted && board.isDefined(name)) {
			return new ConstantValue(name);
		}
		ValueHolder h = values.get(name);
		boolean f = false;
		while (h != null) {
			if (h.getDeep() <= deep) break;
			h = h.getParent();
			f = true;
		}
		if (f) {
			if (h != null) {
				values.put(name, h);
			} else {
				values.remove(name);
			}
		}
		if (h == null) {
			return env.getValue(name, isQuoted);
		} else {
			String value = h.getValue().getString();
			if (board.isDefined(value)) {
				return env.getValue(value, isQuoted);
			}
		}
		return h.getValue();
	}

	@Override
	public void letValue(String name, IValue value) throws EvaluationException {
		ValueHolder parent = values.get(name);
		ValueHolder h = new ValueHolder(deep, value, parent);
		values.put(name, h);
	}

	@Override
	public void setValue(String name, IValue value) throws EvaluationException {
		ValueHolder h = values.get(name);
		if (h == null) {
			env.setValue(name, value);
		} else {
			h.setValue(value);
		}
	}

	@Override
	public void openFrame() {
		deep++;
	}

	@Override
	public void closeFrame() throws EvaluationException {
		if (deep == 0) {
			throw new EvaluationException("Empty Stack");
		}
		deep--;
		for (String name: values.keySet()) {
			getValue(name, false);
		}
	}

	@Override
	public void setScore(int score, long priority) {
		env.setScore(score, priority);
	}
}
