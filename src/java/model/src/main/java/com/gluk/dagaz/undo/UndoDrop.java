package com.gluk.dagaz.undo;

import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.state.State;

public class UndoDrop extends AbstractUndo {

	private String pos;
	private IPiece piece;

	public UndoDrop(String pos, IPiece piece, int deep) {
		super(deep);
		this.pos = pos;
		this.piece = piece;
	}

	@Override
	public void undo(State state) {
		state.toHand(pos, piece);
	}
}
