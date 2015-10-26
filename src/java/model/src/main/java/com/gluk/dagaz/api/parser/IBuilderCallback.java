package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.api.model.IGame;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.model.Board;

public interface IBuilderCallback {
	Board getBoard(String name);
	void addBoard(String name, Board board);
	void addProcessor(IProcessor code);
	void addGame(String name, IGame game);
}
