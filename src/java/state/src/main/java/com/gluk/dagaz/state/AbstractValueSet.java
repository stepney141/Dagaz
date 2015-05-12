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

	public boolean isPersistent() {
		return isClonable;
	}
	
	public boolean isClonable(String name) {
		return clonableFlags.contains(name);
	}

	public void setValue(String name, String value) {
		setValue(name, value, true);
	}

	public void setValue(String name, String value, boolean isPersistent) {
		if (isPersistent) {
			this.isClonable = true;
		}
		flags.put(name, value);
		if (isPersistent) {
			if (!isClonable(name)) {
				clonableFlags.add(name);
			}
		} else {
			if (isClonable(name)) {
				clonableFlags.remove(name);
			}
		}
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
}
