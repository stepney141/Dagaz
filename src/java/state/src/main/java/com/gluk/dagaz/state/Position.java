package com.gluk.dagaz.state;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.CriticalException;
import com.gluk.dagaz.api.exceptions.EmptyPositionException;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.api.state.IPosition;

public class Position extends AbstractValue implements IPosition {
	
	private IPiece piece = null;
	
	public boolean isClonable() {
		return super.isClonable() || (piece != null);
	}

	public IPosition getClone() {
		Position r = new Position();
		copyValuesTo(r);
		r.piece = piece;
		return r;
	}

	public boolean isEmpty() {
		return (piece == null);
	}

	public IPiece getPiece() throws EmptyPositionException {
		if (piece == null) {
			throw new EmptyPositionException("Position is empty");
		}
		return piece;
	}

	public IPiece createPiece(String player, String type) throws CommonException {
		if (piece != null) {
			throw new CriticalException("Posiion is not empty");
		}
		piece = new Piece(player, type);
		return piece;
	}

	public void deletePiece() throws EmptyPositionException {
		if (piece == null) {
			throw new EmptyPositionException("Position is empty");
		}
		piece = null;
	}

	public void setPieceAttribute(String name, String value) {
		piece = (IPiece)piece.setValue(name, value); 
	}
}
