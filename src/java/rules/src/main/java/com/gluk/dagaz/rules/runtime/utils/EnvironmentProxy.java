package com.gluk.dagaz.rules.runtime.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.board.IBoardConfiguration;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class EnvironmentProxy implements IEnvironment {
	
	private IEnvironment env;
	private IBoardConfiguration board;
	
	private int deep = 0;
	private Map<String, ValueHolder> values = new HashMap<String, ValueHolder>();
	private Stack<IContinuationSupport> csStack = new Stack<IContinuationSupport>();
	private Stack<IContinuation> conts = new Stack<IContinuation>(); 
	
	public EnvironmentProxy(IEnvironment env, IBoardConfiguration board) {
		this.env   = env;
		this.board = board;
	}
	
	public EnvironmentProxy(EnvironmentProxy src) {
		this.env   = src.env.getCopy();
		this.board = src.board;
		this.deep  = src.deep;
		for (String name: src.values.keySet()) {
			ValueHolder h = new ValueHolder(src.values.get(name));
			values.put(name, h);
		}
	}
	
	@Override
	public void pushContinuation(IContinuation c) {
		conts.push(c);
	}

	@Override
	public void popContinuation() {
		conts.pop();
	}

	@Override
	public IContinuation getContinuation() {
		IContinuation c = null;
		if (!conts.isEmpty()) {
			c = conts.peek();
		}
		return c;
	}

	@Override
	public IContinuationSupport getContinuationSupport() {
		IContinuationSupport r = null;
		if (!csStack.isEmpty()) {
			r = csStack.peek();
		}
		return r;
	}

	@Override
	public void addContinuationSupport(IContinuationSupport cs) {
		csStack.push(cs);
	}

	@Override
	public void delContinuationSupport() {
		csStack.pop();
	}
	
	@Override
	public IEnvironment getCopy() {
		return new EnvironmentProxy(this);
	}

	private boolean clearName(String name) {
		ValueHolder h = values.get(name);
		boolean r = false;
		while (h != null) {
			if (h.getDeep() <= deep) break;
			h = h.getParent();
			r = true;
		}
		if (r) {
			if (h != null) {
				values.put(name, h);
			} else {
				values.remove(name);
			}
		}
		return r;
	}
	
	@Override
	public IValue getValue(String name, boolean isQuoted) throws ValueNotFoundException {
		if (isQuoted && board.isDefined(name)) {
			return new ConstantValue(name);
		}
		clearName(name);
		ValueHolder h = values.get(name);
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
	public IValue getValue(String name) throws ValueNotFoundException {
		return getValue(name, false);
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
		boolean f = true;
		while (f) {
			f = false;
			for (String name: values.keySet()) {
				if (clearName(name)) {
					f = true;
					break;
				}
			}
		}
	}

	@Override
	public void setScore(int score, long priority) {
		env.setScore(score, priority);
	}

	@Override
	public List<String> getPositions(String zone) throws EvaluationException {
		return env.getPositions(zone);
	}

	@Override
	public List<String> getPositions() throws EvaluationException {
		return env.getPositions();
	}
}
