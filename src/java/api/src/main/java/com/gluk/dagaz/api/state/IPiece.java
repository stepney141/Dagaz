package com.gluk.dagaz.api.state;

public interface IPiece extends IValueSet {
	String getOwner();
	String getType();
	String getHashKey();
	boolean isEqual(IPiece piece);
}
