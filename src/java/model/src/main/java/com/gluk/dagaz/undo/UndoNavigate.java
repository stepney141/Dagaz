package com.gluk.dagaz.undo;

import com.gluk.dagaz.state.State;

public class UndoNavigate extends AbstractUndo {
	
	private String pos;

	public UndoNavigate(String pos, int deep) {
		super(deep);
		this.pos = pos;
	}

	@Override
	public void undo(State state) {
		state.setCurrentPosition(pos);
	}
}
