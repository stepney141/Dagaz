package com.gluk.dagaz.api.state;

public interface IValue {
	String getValue(String name);
	IValue setValue(String name, String value);
	boolean isClonable();
}
