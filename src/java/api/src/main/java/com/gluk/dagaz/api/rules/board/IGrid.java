package com.gluk.dagaz.api.rules.board;

import java.util.List;

import com.gluk.dagaz.api.exceptions.BoardException;

public interface IGrid {
	void addDimension(String dimension) throws BoardException;
	void addDirection(String name, List<Integer> deltas) throws BoardException;
	void generate() throws BoardException;
}
