package com.gluk.dagaz.mock;

import java.util.Stack;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.AbstractProcessor;
import com.gluk.dagaz.utils.AnyUndo;

public class MockProcessor extends AbstractProcessor {
	
	public MockProcessor(IBuild build, IMoveLogger logger) {
		super(build, logger);
	}
	
	public Stack<AnyUndo> getUndoStack() {
		return undo;
	}
	
	public void addFixup(int offset) {}

	public void fixup() throws CommonException {}

	public void addLocalName(String name) {}

	public boolean isLocalName(String name) {
		return true;
	}

	public void setDeferred(int offset) {}

	public int getNextCommand() {
		return nextCommand;
	}
	
	public boolean execCommand(ICommand c, IDeferredCheck state, IEnvironment env) throws CommonException {
		nextCommand = 1;
		currCommand = 1;
		return c.execute(this, state, env);
	}

	public IBoard getBoard() {
		return build.getBoard();
	}
}
