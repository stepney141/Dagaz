package com.gluk.dagaz.undo;

import com.gluk.dagaz.state.State;

public class UndoMark extends AbstractUndo {

	public UndoMark(int deep) {
		super(deep);
	}

	@Override
	public void execute(State state) {
		state.popMarked();
	}
}
