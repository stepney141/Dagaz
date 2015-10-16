package com.gluk.dagaz.api.runtime;

import java.util.Stack;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.model.IValue;

public interface IProcessor {
	IMoveLogger getMoveLogger();
	Stack<?> getUndo();
	Stack<IValue> getStack();
	void incNextCommand(int delta);
}
