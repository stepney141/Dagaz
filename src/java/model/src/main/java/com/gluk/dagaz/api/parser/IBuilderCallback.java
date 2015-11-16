package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.api.model.IGame;
import com.gluk.dagaz.model.Board;

public interface IBuilderCallback {
	Board getBoard(String name);
	void addBoard(String name, Board board);
	void addBuild(IBuild code);
	void addGame(String name, IGame game);
}
