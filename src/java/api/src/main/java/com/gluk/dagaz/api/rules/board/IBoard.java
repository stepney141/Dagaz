package com.gluk.dagaz.api.rules.board;

import com.gluk.dagaz.api.exceptions.BoardException;

public interface IBoard {
	String changePosition(String position, String direction, String player) throws BoardException;
	boolean inZone(String position, String name, String player) throws BoardException;
	void execOperation(String name, String player, IBoardOperationCallback callback) throws BoardException;
}
