package com.gluk.dagaz.api.rules;

import com.gluk.dagaz.api.exceptions.MoveExecutorException;

public interface IMoveExecutor {
	void setPosition(String position) throws MoveExecutorException;
	boolean changePosition(String direction) throws MoveExecutorException;
	void addPieceToMoveSet() throws MoveExecutorException;
	void dropMoveSet() throws MoveExecutorException;
}
