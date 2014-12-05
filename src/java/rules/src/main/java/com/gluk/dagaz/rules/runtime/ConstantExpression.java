package com.gluk.dagaz.rules.runtime;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.api.rules.runtime.SystemIds;

public class ConstantExpression implements IValue {
	
	private static Map<Boolean, IValue> bools = new HashMap<Boolean, IValue>();
	
	private int type = SystemIds.UNKNOWN_TYPE;
	private String value = null;
	
	public ConstantExpression(boolean value) {
		this.type  = SystemIds.BOOLEAN_TYPE;
		this.value = value ? "1" : ""; 
	}

	public ConstantExpression(String value) {
		this.type  = SystemIds.STRING_TYPE;
		this.value = value; 
	}
	
	public ConstantExpression(long value) {
		this.type  = SystemIds.NUMBER_TYPE;
		this.value = Long.toString(value); 
	}
	
	public static IValue createBoolean(Boolean value) {
		IValue r = bools.get(value);
		if (r == null) {
			r = new ConstantExpression(value);
			bools.put(value, r);
		}
		return r;
	}
	
	public boolean isList() {
		return false;
	}

	public boolean isBoolean() {
		return (type == SystemIds.BOOLEAN_TYPE);
	}

	public boolean isNumber() {
		return (type == SystemIds.NUMBER_TYPE);
	}

	public String getString() throws RuntimeException {
		if (value == null) {
			throw new RuntimeException("Unknown value");
		}
		return value;
	}

	public boolean getBoolean() throws RuntimeException {
		if (value == null) {
			throw new RuntimeException("Unknown value");
		}
		return (!value.isEmpty());
	}

	public long getNumber() throws RuntimeException {
		if (value == null) {
			throw new RuntimeException("Unknown value");
		}
		long r = 0;
		try {
			r = Long.parseLong(value);
		} catch (NumberFormatException e) {
			throw new RuntimeException(e.toString(), e);
		}
		return r;
	}

}
