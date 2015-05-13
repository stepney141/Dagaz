package com.gluk.dagaz.api.state;

public interface IPiece extends IValueSet {
	String   getType();
	String   getPlayer();
	String   getHashKey();
	boolean  isEqual(IPiece p);
}
