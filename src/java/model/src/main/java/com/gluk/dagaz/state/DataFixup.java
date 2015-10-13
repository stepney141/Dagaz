package com.gluk.dagaz.state;

import com.gluk.dagaz.api.model.IValue;

public class DataFixup {
	
	private IValue value;
	private int deep;
	
	public DataFixup(IValue value, int deep) {
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
