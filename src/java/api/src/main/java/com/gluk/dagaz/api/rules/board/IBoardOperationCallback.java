package com.gluk.dagaz.api.rules.board;

import com.gluk.dagaz.api.exceptions.BoardException;

public interface IBoardOperationCallback {
	void changePosition(String oldPosition, String newPosition) throws BoardException;
}
