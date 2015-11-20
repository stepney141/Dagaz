package com.gluk.dagaz.utils;

import com.gluk.dagaz.api.state.IPiece;

public class PieceHandler {
	
	private String pos;
	private IPiece piece = null;
	
	public PieceHandler(String pos, IPiece piece) {
		this.pos = pos;
		this.piece = piece;
	}
	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(pos);
		if (piece != null) {
			sb.append("=");
			sb.append(piece.toString());
		}
		return sb.toString();
	}
	
	public boolean isEmpty() {
		return piece == null;
	}
	
	public IPiece getPiece() {
		return piece;
	}
	
	public void clearPiece() {
		piece = null;
	}
	
	public void setPiece(IPiece piece) {
		this.piece = piece;
	}
	
	public String getPosition() {
		return pos;
	}

	public void setPosition(String pos) {
		this.pos = pos;
	}
}
