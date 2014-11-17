package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.EmptyPositionException;

public interface IPosition extends IValue {
	boolean isEmpty();
	IPiece getPiece() throws EmptyPositionException;
}
