package com.gluk.dagaz.state;

import com.gluk.dagaz.api.model.IValue;

public class Fixup {
	
	private IValue value;
	private int deep;
	
	public Fixup(IValue value, int deep) {
		this.value = value;
		this.deep = deep;
	}

	public IValue getValue() {
		return value;
	}
	
	public void setValue(IValue value) {
		this.value = value;
	}
	
	public int getDeep() {
		return deep;
	}
}
