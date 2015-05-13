package com.gluk.dagaz.state;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.gluk.dagaz.api.state.IValueSet;

public abstract class AbstractValueSet implements IValueSet {

	private Map<String, String>   values = new HashMap<String, String>();
	private Set<String> persistentValues = new HashSet<String>();
	
	public boolean isValuePresent(String name) {
		return values.containsKey(name);
	}

	public boolean isPersistent(String name) {
		return persistentValues.contains(name);
	}

	public String getValue(String name) {
		String r = values.get(name);
		if (r == null) {
			// Возврат неинициализированного значения !!!
			r = "";
		}
		return r;
	}

	public void setValue(String name, String value, boolean isPersistent) {
		values.put(name, value);
		if (isPersistent) {
			if (!isPersistent(name)) {
				persistentValues.add(name);
			}
		} else {
			if (isPersistent(name)) {
				persistentValues.remove(name);
			}
		}
	}

	public void setValue(String name, String value) {
		setValue(name, value, true);
	}

	public Collection<String> getPersistentValues() {
		return persistentValues;
	}

	public boolean isEqual(IValueSet v) {
		Collection<String> names = v.getPersistentValues();
		if (names.size() != persistentValues.size()) return false;
		for (String name: names) {
			String value = v.getValue(name);
			if (!value.equals(getValue(name))) return false;
		}
		return true;
	}
}
