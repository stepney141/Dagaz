package com.gluk.dagaz.state;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.gluk.dagaz.api.state.IValue;

public abstract class AbstractValue implements IValue {

	private boolean isClonable = false;
	private Map<String, String> flags = new HashMap<String, String>();
	private Set<String> clonableFlags = new HashSet<String>();
	
	protected Collection<String> getClonableFlags() {
		return clonableFlags;
	}

	public String getValue(String name) {
		String r = flags.get(name);
		if (r == null) {
			r = "";
		}
		return r;
	}

	public boolean isClonable() {
		return isClonable;
	}
	
	public boolean isClonable(String name) {
		return clonableFlags.contains(name);
	}

	public IValue setValue(String name, String value) {
		setValue(name, value, true);
		return this;
	}

	public IValue setValue(String name, String value, boolean isClonable) {
		if (isClonable) {
			this.isClonable = true;
		}
		flags.put(name, value);
		if (isClonable) {
			if (!isClonable(name)) {
				clonableFlags.add(name);
			}
		} else {
			if (isClonable(name)) {
				clonableFlags.remove(name);
			}
		}
		return this;
	}

	public void copyValuesTo(AbstractValue v) {
		for (String name: getClonableFlags()) {
			String value = getValue(name);
			v.setValue(name, value, true);
		}
	}
}
