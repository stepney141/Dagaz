package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.CommonException;

public interface IPieceIterator {
	IPiecePosition getPiece();
	void           addPiece(String pos, boolean isCut) throws CommonException;
}
