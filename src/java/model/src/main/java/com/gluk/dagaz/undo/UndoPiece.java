package com.gluk.dagaz.undo;

import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.state.State;

public class UndoPiece extends AbstractUndo {
	
	private String pos;
	private IPiece piece;

	public UndoPiece(String pos, IPiece piece, int deep) {
		super(deep);
		this.pos = pos;
		this.piece = piece;
	}

	@Override
	public void execute(State state) {
		state.changePiece(pos, piece);
	}
}
