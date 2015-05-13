package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.EmptyPositionException;

public interface IPosition extends IValueSet {
	boolean isEmpty();
	boolean isClear();
	IPiece  getPiece() throws EmptyPositionException;
	IPiece  addPiece(IPiece piece) throws CommonException;
	IPiece  addPiece(String player, String type) throws CommonException;
	void    delPiece() throws EmptyPositionException;
	void    setAttribute(String name, String value) throws EmptyPositionException;
}
