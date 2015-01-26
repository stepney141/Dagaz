package com.gluk.dagaz.rules.runtime.utils;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class CallFrame {
	
	private int current = -1;
	private Map<Integer, IValue> values = new HashMap<Integer, IValue>();
	
	public int getCurrent() {
		return current;
	}
	
	public void setCurrent(int ix) {
		this.current = ix;
	}
	
	public void setValue(Integer ix, IValue v) {
		this.current = -1;
		values.put(ix, v);
	}
	
	public int useValues(IExpression e) {
		for (Integer n: values.keySet()) {
			e.setCache(n, values.get(n));
		}
		return current;
	}
	
	public CallFrame getCopy() {
		CallFrame r = new CallFrame();
		r.setCurrent(getCurrent());
		for (Integer n: values.keySet()) {
			r.values.put(n, values.get(n));
		}
		return r;
	}
}
