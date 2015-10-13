package com.gluk.dagaz.undo;

import com.gluk.dagaz.state.State;

public abstract class AbstractUndo {
	
	private int deep;
	
	public AbstractUndo(int deep) {
		this.deep = deep;
	}
	
	public int getDeep() {
		return deep;
	}
	
	public abstract void execute(State state);
}
