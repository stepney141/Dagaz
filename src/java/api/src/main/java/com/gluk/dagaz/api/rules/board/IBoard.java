package com.gluk.dagaz.api.rules.board;

import com.gluk.dagaz.api.exceptions.BoardException;
import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.state.IState;

public interface IBoard {
	String changePosition(String position, String direction, String player) throws BoardException;
	boolean inZone(String position, String name, String player) throws BoardException;
	void execOperation(String name, String player, IBoardOperationCallback callback) throws BoardException;
	void initState(IState state) throws BoardException;
	long addToHash(long hash, String position, IState state) throws CommonException;
}
