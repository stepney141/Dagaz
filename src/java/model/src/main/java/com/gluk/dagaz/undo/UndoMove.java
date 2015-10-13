package com.gluk.dagaz.undo;

import com.gluk.dagaz.state.State;

public class UndoMove extends AbstractUndo {
	
	private String pos;
	private int ix;

	public UndoMove(String pos, int ix, int deep) {
		super(deep);
		this.pos = pos;
		this.ix = ix;
	}

	@Override
	public void execute(State state) {
		state.setPosition(ix, pos);
	}
}
