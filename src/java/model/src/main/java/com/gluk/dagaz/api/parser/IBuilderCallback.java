package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.runtime.IProcessor;

public interface IBuilderCallback {
	void addBoard(String name, IBoard board);
	void addProcessor(IProcessor code);
}
