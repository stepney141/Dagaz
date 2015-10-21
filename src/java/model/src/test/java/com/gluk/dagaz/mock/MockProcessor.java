package com.gluk.dagaz.mock;

import java.util.Stack;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.utils.AnyUndo;

public class MockProcessor implements IProcessor {
	
	private IBoard board;
	private IMoveLogger logger;
	private Stack<AnyUndo> undo = new Stack<AnyUndo>();
	private Stack<IValue> stack = new Stack<IValue>();
	private int nextCommand = 0; 
	
	public MockProcessor(IBoard board, IMoveLogger logger) {
		this.board  = board;
		this.logger = logger;
	}
	
	public int getNextCommand() {
		return nextCommand;
	}

	public IBoard getBoard() {
		return board;
	}

	public IMoveLogger getMoveLogger() {
		return logger;
	}

	public Stack<AnyUndo> getUndo() {
		return undo;
	}

	public Stack<IValue> getStack() {
		return stack;
	}

	public void incNextCommand(int delta) {
		nextCommand += delta;
	}
}
