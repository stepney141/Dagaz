package com.gluk.dagaz.rules.runtime;

import com.gluk.dagaz.api.rules.runtime.IValue;

public class ValueHolder {
	
	private int deep;
	private IValue value;
	private ValueHolder parent = null;
	
	public ValueHolder(int deep, IValue value, ValueHolder parent) {
		this.deep   = deep;
		this.value  = value;
		this.parent = parent;
	}
	
	public int getDeep() {
		return deep;
	}
	
	public IValue getValue() {
		return value;
	}

	public ValueHolder getParent() {
		return parent;
	}
	
	public void setValue(IValue value) {
		this.value = value;
	}
}
