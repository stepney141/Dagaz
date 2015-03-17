package com.gluk.dagaz.rules.runtime.utils;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.rules.runtime.IContinuation;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class Continuation implements IContinuation {
	
	private IEnvironment env;
	private Map<IExpression, Map<Long, IValue>> cache = new HashMap<IExpression, Map<Long, IValue>>();
	
	public Continuation(IEnvironment env) {
		this.env = env;
	}
	
	public Continuation(Continuation c) {
		this.env = c.env;
		for (IExpression e: c.cache.keySet()) {
			Map<Long, IValue> dst = new HashMap<Long, IValue>();
			Map<Long, IValue> src = c.cache.get(e); 
			for (Long level: src.keySet()) {
				IValue v = src.get(level);
				dst.put(level, v);
			}
			cache.put(e, dst);
		}
	}

	@Override
	public void setEnvironment(IEnvironment env) {
		this.env = env;
	}

	@Override
	public IEnvironment getEnvironment() {
		return env;
	}

	@Override
	public void cacheValue(IExpression e, Long level, IValue v) {
		Map<Long, IValue> l = cache.get(e);
		if (l == null) {
			l = new HashMap<Long, IValue>();
			cache.put(e, l);
		}
		l.put(level, v);
	}

	@Override
	public IValue getCachedValue(IExpression e, Long level) {
		Map<Long, IValue> l = cache.get(e);
		if (l == null) {
			return null;
		}
		return l.get(level);
	}
}
