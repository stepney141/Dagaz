package com.gluk.dagaz.undo;

import com.gluk.dagaz.state.State;

public class UndoPos extends AbstractUndo {

	private String pos;
	
	public UndoPos(String pos, int deep) {
		super(deep);
		this.pos   = pos;
	}
	
	@Override
	public void execute(State state) {
		state.changeCurrentPosition(pos);
	}
}
