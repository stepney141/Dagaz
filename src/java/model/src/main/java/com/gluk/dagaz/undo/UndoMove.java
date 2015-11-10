package com.gluk.dagaz.undo;

import com.gluk.dagaz.state.State;

public class UndoMove extends AbstractUndo {
	
	private String pos;

	public UndoMove(String pos, int deep) {
		super(deep);
		this.pos = pos;
	}

	@Override
	public void execute(State state) {
		state.setPosition(pos);
	}
}
