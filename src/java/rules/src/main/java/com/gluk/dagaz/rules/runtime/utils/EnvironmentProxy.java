package com.gluk.dagaz.rules.runtime.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.board.IBoardConfiguration;
import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IContinuationSupport;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class EnvironmentProxy implements IEnvironment, IContinuationSupport {
	
	private IEnvironment env;
	private IBoardConfiguration board;
	
	private int deep = 0;
	private Map<String, ValueHolder> values = new HashMap<String, ValueHolder>();
	
	private boolean isContinuationsSupported = false;
	private IContinuationSupport cs = null;
	
	public EnvironmentProxy(IEnvironment env, IBoardConfiguration board, boolean isContinuationsSupported) {
		this.env   = env;
		this.board = board;
		this.isContinuationsSupported = isContinuationsSupported;
		this.cs = new ContinuationSupport();
	}
	
	public EnvironmentProxy(IEnvironment env, IBoardConfiguration board) {
		this.env   = env;
		this.board = board;
	}
	
	public EnvironmentProxy(EnvironmentProxy src) {
		this.env   = src.env.getCopy();
		this.board = src.board;
		this.deep  = src.deep;
		this.cs    = src.cs;
		this.isContinuationsSupported = src.isContinuationsSupported;
		for (String name: src.values.keySet()) {
			ValueHolder h = new ValueHolder(src.values.get(name));
			values.put(name, h);
		}
	}
	
	@Override
	public IEnvironment getCopy() {
		return new EnvironmentProxy(this);
	}

	@Override
	public boolean isContinuationsSupported() {
		return isContinuationsSupported;
	}

	@Override
	public void addContinuation(IEnvironment env) throws EvaluationException {
		cs.addContinuation(env);
	}
	
	@Override
	public IContinuation getContinuation() {
		return cs.getContinuation();
	}
	
	@Override
	public void addValue(int ix) {
		if (isContinuationsSupported) {
			cs.addValue(ix);
		}
	}

	@Override
	public void setValue(int ix, IValue v) {
		if (isContinuationsSupported) {
			cs.setValue(ix, v);
		}
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
