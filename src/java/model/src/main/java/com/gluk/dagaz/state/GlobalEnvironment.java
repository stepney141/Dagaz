package com.gluk.dagaz.state;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Value;

public class GlobalEnvironment implements IEnvironment {
	
	private Map<String, IValue> values = new HashMap<String, IValue>();

	public boolean isDefined(String name) throws CommonException {
		return values.containsKey(name);
	}

	public IValue get(String name) throws CommonException {
		IValue value = values.get(name);
		if (value == null) {
			value = Value.create(0);
			values.put(name, value);
		}
		return value;
	}

	public void set(String name, IValue value) throws CommonException {
		values.put(name, value);
	}

	public void del(String name) throws CommonException {
		values.remove(name);
	}

	public void let(String name, IValue value) throws CommonException {
		throw new CommonException("Unsupported");
	}
}
