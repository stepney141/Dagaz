package com.gluk.dagaz.api.state;

public interface IPiecePosition {
	IPiece getPiece();
	String getPosition();
	void   setPosition(String pos);
	void   setAttribute(String name, String value);
}
