package com.gluk.dagaz.state;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.CriticalException;
import com.gluk.dagaz.api.exceptions.EmptyPositionException;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.api.state.IPosition;

public class Position extends AbstractValueSet implements IPosition {
	
	private IPiece piece = null;
	
	public Position() {}

	public Position(IPosition p) throws EmptyPositionException {
		for (String name: p.getPersistentValues()) {
			setValue(name, p.getValue(name));
		}
		if (!p.isEmpty()) {
			this.piece = p.getPiece();
		}
	}
	
	public boolean isEmpty() {
		return (piece == null);
	}

	public boolean isClear() {
		return isEmpty() && (getPersistentValues().isEmpty());
	}

	public IPiece getPiece() throws EmptyPositionException {
		if (piece == null) {
			throw new EmptyPositionException("Position is empty");
		}
		return piece;
	}

	public void setAttribute(String name, String value) throws EmptyPositionException {
		if (isEmpty()) {
			throw new EmptyPositionException("Position.setAttribute is failed");
		}
		if (!piece.isValuePresent(name) || 
			!piece.isPersistent(name) ||
			!piece.getValue(name).equals(value)) {
			piece = new Piece(piece);
			piece.setValue(name, value, true);
		}
	}
	
	public IPiece addPiece(IPiece piece) throws CommonException {
		if (!isEmpty()) {
			throw new CriticalException("Posion is not empty");
		}
		this.piece = piece;
		return piece;
	}

	public IPiece addPiece(String player, String type) throws CommonException {
		IPiece p = new Piece(player, type);
		return addPiece(p);
	}
	
	public void delPiece() throws EmptyPositionException {
		if (piece == null) {
			throw new EmptyPositionException("Position is empty");
		}
		piece = null;
	}
}
