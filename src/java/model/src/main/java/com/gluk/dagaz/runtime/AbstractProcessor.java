package com.gluk.dagaz.runtime;

import java.util.HashSet;
import java.util.Set;
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

public abstract class AbstractProcessor extends AbstractBuild implements IProcessor, IBuild {
	
	private IBoard board;
	private IMoveLogger logger;

	protected Stack<IValue>       stack = new Stack<IValue>();
	protected Stack<AnyUndo>      undo  = new Stack<AnyUndo>();
	protected Set<ITransactional> trans = new HashSet<ITransactional>();
	protected int nextCommand;
	protected int currCommand;
	
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
	
	public Stack<IValue> getStack() {
		return stack;
	}
	
	public AnyUndo getUndo() {
		AnyUndo u = null;
		if (undo.isEmpty() || (undo.peek().getCurr() != currCommand - 1)) {
			u = new AnyUndo(nextCommand - 1, currCommand - 1);
		} else {
			u = undo.pop();
			u.getStack().clear();
		}
		return u;
	}
	
	public void pushUndo(AnyUndo u) {
		for (IValue v: stack) {
			u.saveStack(v);
		}
		undo.push(u);
	}
	
	public void savepoint() {
		for (ITransactional t: trans) {
			t.savepoint();
		}
	}

	public boolean rollback() throws CommonException {
		if (undo.isEmpty()) {
			return false;
		}
		for (ITransactional t: trans) {
			t.rollback();
		}
		AnyUndo u = undo.peek();
		stack.clear();
		for (IValue v: u.getStack()) {
			stack.push(v);
		}
		nextCommand = u.getNext();
		currCommand = u.getCurr();
		return true;
	}
	
	public void clear() {
		logger.clear();
		stack.clear();
		trans.clear();
		trans.add(getMoveLogger());
	}
	
	public void incNextCommand(int delta) {
		nextCommand += delta;
	}

	public void execute(IDeferredCheck state, IEnvironment env) throws CommonException {
		nextCommand = 0;
		currCommand = 0;
		while (nextCommand < commands.size()) {
			ICommand c = commands.get(nextCommand);
			nextCommand++;
			currCommand++;
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
