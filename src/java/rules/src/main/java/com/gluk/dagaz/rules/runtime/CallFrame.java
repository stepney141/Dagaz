package com.gluk.dagaz.rules.runtime;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IValue;

public class CallFrame {
	
	private int currIx = -2;
	private Map<Integer, IValue> values = new HashMap<Integer, IValue>();
	
	public int getCurrent() {
		return currIx;
	}
	
	public void setCurrent(int ix) {
		currIx = ix;
	}
	
	public void addValue(Integer n, IValue v) {
		values.put(n, v);
	}
	
	public void remValue(Integer n) {
		values.remove(n);
	}
	
	public void setValues(IExpression e) {
		for (Integer n: values.keySet()) {
			e.setCache(n, values.get(n));
		}
	}
	
	public CallFrame getCopy() {
		CallFrame r = new CallFrame();
		r.setCurrent(currIx);
		for (Integer n: values.keySet()) {
			r.values.put(n, values.get(n));
		}
		return r;
	}
}
