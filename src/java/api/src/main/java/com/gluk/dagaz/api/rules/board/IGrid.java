package com.gluk.dagaz.api.rules.board;

import com.gluk.dagaz.api.exceptions.BoardException;

public interface IGrid {
	void addDimension(String dimension) throws BoardException;
	void addDirection(String name, int delta) throws BoardException;
	void generate(IBoardConfiguration board) throws BoardException;
}
