package com.gluk.dagaz.state;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.gluk.dagaz.api.state.IValueSet;

public abstract class AbstractValueSet implements IValueSet {

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

	public IValueSet setValue(String name, String value) {
		setValue(name, value, true);
		return this;
	}

	public IValueSet setValue(String name, String value, boolean isClonable) {
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

	public void copyValuesTo(AbstractValueSet v) {
		for (String name: getClonableFlags()) {
			String value = getValue(name);
			v.setValue(name, value, true);
		}
	}

	public int getValuesCount() {
		return clonableFlags.size();
	}
	
	public boolean isValuePresent(String name) {
		return clonableFlags.contains(name);
	}
	
	public boolean isEqualValues(IValueSet value) {
		if (getValuesCount() != value.getValuesCount()) return false;
		for (String name: clonableFlags) {
			if (!value.isValuePresent(name)) return false;
			String v = flags.get(name);
			if (v == null) return false;
			if (!value.getValue(name).equals(v)) return false;
		}
		return true;
	}
}
