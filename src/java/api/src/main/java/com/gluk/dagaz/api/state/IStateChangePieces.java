package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.StateException;

public interface IStateChangePieces {
	IPiece createPiece(String position, String owner, String type) throws StateException;
	void movePiece(String startPosition, String endPosition) throws StateException;
	void deletePiece(String position) throws StateException;
}
