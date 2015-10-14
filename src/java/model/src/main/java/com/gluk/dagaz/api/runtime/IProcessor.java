package com.gluk.dagaz.api.runtime;

import java.util.Stack;

import com.gluk.dagaz.api.application.IMoveGenerator;
import com.gluk.dagaz.api.model.IValue;

public interface IProcessor {
	IMoveGenerator getMoveGenerator();
	Stack<?> getUndo();
	Stack<IValue> getStack();
	void incNextCommand(int delta);
}
