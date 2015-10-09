package com.gluk.dagaz.undo;

import com.gluk.dagaz.state.State;

public class UndoTake extends AbstractUndo {

	public UndoTake(int deep) {
		super(deep);
	}

	@Override
	public void undo(State state) {
		state.undoTake();
	}
}
