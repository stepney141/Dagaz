package com.gluk.dagaz.undo;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.state.State;

public class UndoValue extends AbstractUndo {
	
	private IValue value;
	private String name;
	private String pos;

	public UndoValue(String name, String pos, IValue value, int deep) {
		super(deep);
		this.name  = name;
		this.pos   = pos;
		this.value = value;
	}

	@Override
	public void execute(State state) {
		state.changeFlag(name, pos, value);
	}
}
