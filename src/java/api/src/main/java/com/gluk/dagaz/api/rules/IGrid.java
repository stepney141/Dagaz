package com.gluk.dagaz.api.rules;

import com.gluk.dagaz.api.exceptions.BoardException;

public interface IGrid {
	void addDimension(String description) throws BoardException;
	void configure(IBoard board) throws BoardException;
}
