package com.gluk.dagaz.undo;

import com.gluk.dagaz.state.State;

public class UndoBack extends AbstractUndo {
	
	private String pos;

	public UndoBack(String pos, int deep) {
		super(deep);
		this.pos = pos;
	}

	@Override
	public void execute(State state) {
		state.pushMarked(pos);
	}
}
