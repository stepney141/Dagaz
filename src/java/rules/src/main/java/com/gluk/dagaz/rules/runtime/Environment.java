package com.gluk.dagaz.rules.runtime;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;

public abstract class Environment implements IEnvironment {
	
	private int deep = 0;
	private Map<String, ValueHolder> values = new HashMap<String, ValueHolder>();

	@Override
	public IValue getValue(String name) throws ValueNotFoundException {
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
			throw new ValueNotFoundException("Value [" + name + "] not found");
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
			throw new ValueNotFoundException("Value [" + name + "] not found");
		}
		h.setValue(value);
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
	}
}
