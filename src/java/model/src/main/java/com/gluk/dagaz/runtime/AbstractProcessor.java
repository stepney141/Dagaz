package com.gluk.dagaz.runtime;

import java.util.Stack;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.ITransactional;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.parser.AbstractBuild;
import com.gluk.dagaz.utils.AnyUndo;

public abstract class AbstractProcessor extends AbstractBuild implements IProcessor, IBuild, ITransactional {

	private IBoard board;
	private IMoveLogger logger;

	protected Stack<IValue> stack = new Stack<IValue>();
	protected Stack<AnyUndo> undo = new Stack<AnyUndo>();
	protected int nextCommand;
	
	public AbstractProcessor(IBoard board, IMoveLogger logger) {
		this.board  = board;
		this.logger = logger;
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
	
	public void clear() {
		logger.clear();
		stack.clear();
	}
	
	public int getNextCommand() {
		return nextCommand;
	}

	public void incNextCommand(int delta) {
		nextCommand += delta;
	}

	public void execute(IDeferredCheck state, IEnvironment env) throws CommonException {
		nextCommand = 0;
		while (nextCommand < commands.size()) {
			ICommand c = commands.get(nextCommand);
			nextCommand++;
			if (c.isDeferred()) {
				state.addDeferredCommand(c);
				continue;
			}
			if (!c.execute(state, env)) {
				if (!rollback()) {
					break;
				}
			}
		}
	}
}
