package com.gluk.dagaz.api.state;

public interface IValueSet {
	String getValue(String name);
	IValueSet setValue(String name, String value);
	boolean isClonable();
	int getValuesCount();
	boolean isValuePresent(String name);
	boolean isEqualValues(IValueSet value);
}
