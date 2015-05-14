package com.gluk.dagaz.state;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.state.IPieceIterator;
import com.gluk.dagaz.api.state.IPiecePosition;

public class PieceIterator implements IPieceIterator {
	
	private PieceList owner;
	private int ix = 0;
	
	public PieceIterator(PieceList owner) {
		this.owner = owner;
	}

	public IPiecePosition getPiece() {
		IPiecePosition p = owner.getPiece(ix);
		if (p != null) {
			ix++;
		}
		return p;
	}

	public void addPiece(String pos, boolean isCut) throws CommonException {
		owner.addPiece(pos, isCut);
	}
}
