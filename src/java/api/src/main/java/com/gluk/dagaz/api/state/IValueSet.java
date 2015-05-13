package com.gluk.dagaz.api.state;

import java.util.Collection;

public interface IValueSet {
	boolean            isValuePresent(String name);
  	boolean            isPersistent(String name);
	String             getValue(String name);
	void               setValue(String name, String value, boolean isPersistent);
	void               setValue(String name, String value);
	Collection<String> getPersistentValues();
	boolean            isEqual(IValueSet v);
}
