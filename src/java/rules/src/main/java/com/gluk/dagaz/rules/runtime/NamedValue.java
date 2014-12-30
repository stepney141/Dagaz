package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.rules.runtime.IValue;

public class NamedValue {
	
	String name;
	IValue value;
	
	public NamedValue(String name, IValue value) {
		this.name  = name;
		this.value = value;
	}
	
	public String getName() {
		return name;
	}
	
	public IValue getValue() {
		return value;
	}
}
