package com.gluk.dagaz.api.state;

public interface IValueSet {
	String    getValue(String name);
	void      setValue(String name, String value, boolean isPersistent);
	void      setValue(String name, String value);
	boolean   isValuePresent(String name);
  	boolean   isPersistent();
}
