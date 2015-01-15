package com.gluk.dagaz.rules.runtime;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.api.rules.runtime.SystemIds;

public class ConstantValue implements IValue {
	
	private static Map<Boolean, IValue> bools = new HashMap<Boolean, IValue>();
	
	private int type = SystemIds.UNKNOWN_TYPE;
	private String value = null;
	
	public ConstantValue(boolean value) {
		this.type  = SystemIds.BOOLEAN_TYPE;
		this.value = value ? "1" : ""; 
	}

	public ConstantValue(String value) {
		this.type  = SystemIds.STRING_TYPE;
		this.value = value; 
	}
	
	public ConstantValue(long value) {
		this.type  = SystemIds.NUMBER_TYPE;
		this.value = Long.toString(value); 
	}
	
	public static IValue createBoolean(Boolean value) {
		IValue r = bools.get(value);
		if (r == null) {
			r = new ConstantValue(value);
			bools.put(value, r);
		}
		return r;
	}
	
	@Override
	public boolean isList() {
		return false;
	}

	@Override
	public boolean isBoolean() {
		return (type == SystemIds.BOOLEAN_TYPE);
	}

	@Override
	public boolean isNumber() {
		return (type == SystemIds.NUMBER_TYPE);
	}

	@Override
	public String getString() throws RuntimeException {
		if (value == null) {
			throw new RuntimeException("Unknown value");
		}
		return value;
	}

	@Override
	public boolean getBoolean() throws RuntimeException {
		if (value == null) {
			throw new RuntimeException("Unknown value");
		}
		return (!value.isEmpty());
	}

	@Override
	public long getLong() throws RuntimeException {
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
