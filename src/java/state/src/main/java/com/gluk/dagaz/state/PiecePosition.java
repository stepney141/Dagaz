package com.gluk.dagaz.state;

import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.api.state.IPiecePosition;

public class PiecePosition implements IPiecePosition {
	
	private IPiece piece;
	private String position;
	
	public PiecePosition(IPiece piece, String position) {
		this.piece = piece;
		this.position = position;
	}
	
	public IPiece getPiece() {
		return piece;
	}
	
	public void setPiece(IPiece piece) {
		this.piece = piece;
	}
	
	public String getPosition() {
		return position;
	}
	
	public void setPosition(String position) {
		this.position = position;
	}
	
	public boolean isEqual(PiecePosition p) {
		if (position.equals(p.getPosition()) && piece.isEqual(p.getPiece())) {
			return true;
		}
		return false;
	}

	public void setAttribute(String name, String value) {
		if (!piece.isValuePresent(name) || 
			!piece.isPersistent(name) ||
			!piece.getValue(name).equals(value)) {
			piece = new Piece(piece);
			piece.setValue(name, value, true);
		}
	}
}
