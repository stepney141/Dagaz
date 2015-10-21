package com.gluk.dagaz.api.runtime;

import java.util.Stack;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.utils.AnyUndo;

public interface IProcessor {
	IBoard getBoard();
	IMoveLogger getMoveLogger();
	Stack<AnyUndo> getUndo();
	Stack<IValue> getStack();
	void incNextCommand(int delta);
}
