package com.gluk.dagaz.runtime;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.state.IValue;
import com.gluk.dagaz.exceptions.CommonException;

public class Value implements IValue {
	
	private static Map<String, IValue> values = new HashMap<String, IValue>();
	
	private String value;
	private boolean isReference = false;
	
	public synchronized static IValue quote(String name) {
		IValue r = values.get(name);
		if ((r != null) && !r.isReference()) {
			r = null;
		}
		if (r == null) {
			Value v = new Value(name);
			v.isReference = true;
			r = v;
			values.put(name, r);
		}
		return r;
	}
	
	public synchronized static IValue create(String value) {
		IValue r = values.get(value);
		if ((r != null) && r.isReference()) {
			r = null;
		}
		if (r == null) {
			r = new Value(value);
			values.put(value, r);
		}
		return r;
	}

	public synchronized static IValue create(int value) {
		String s = Integer.toString(value);
		IValue r = values.get(s);
		if ((r != null) && r.isReference()) {
			r = null;
		}
		if (r == null) {
			r = new Value(value);
			values.put(s, r);
		}
		return r;
	}
	
	public synchronized static IValue create(boolean value) {
		String s = value?"1":"0";
		IValue r = values.get(s);
		if ((r != null) && r.isReference()) {
			r = null;
		}
		if (r == null) {
			r = new Value(value);
			values.put(s, r);
		}
		return r;
	}

	public Value(String value) {
		this.value = value;
	}

	public Value(int value) {
		this.value = Integer.toString(value);
	}

	public Value(boolean value) {
		this.value = value?"1":"0";
	}

	public String getString() {
		return value;
	}

	public int getNumber() throws CommonException {
		int r;
		try {
			r = Integer.parseInt(value);
		} catch (NumberFormatException e) {
			throw new CommonException(e.toString(), e);
		}
		return r;
	}

	public boolean getBoolean() throws CommonException {
		if (value.isEmpty()) return false;
		if (value.equals("0")) return false;
		return true;
	}

	public boolean isReference() {
		return isReference;
	}
}
