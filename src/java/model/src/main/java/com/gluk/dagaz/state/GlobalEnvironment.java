package com.gluk.dagaz.state;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IValue;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.Value;

public class GlobalEnvironment implements IEnvironment {
	
	private Map<String, IValue> values = new HashMap<String, IValue>();
	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		boolean f = false;
		for (String name: values.keySet()) {
			if (f) {
				sb.append(",");
			}
			sb.append(name);
			sb.append("=");
			sb.append(values.get(name).toString());
			f = true;
		}
		return sb.toString();
	}

	public boolean isDefined(String name) {
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

	public boolean isKnown(String name) {
		return isDefined(name);
	}
}
