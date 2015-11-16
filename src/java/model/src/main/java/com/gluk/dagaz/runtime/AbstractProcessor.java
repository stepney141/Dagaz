package com.gluk.dagaz.runtime;

import java.util.HashSet;
import java.util.Set;
import java.util.Stack;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.ITransactional;
import com.gluk.dagaz.api.state.IValue;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.AnyUndo;

public abstract class AbstractProcessor implements IProcessor {
	
	private IMoveLogger logger;
	
	protected IBuild              build;
	protected Stack<IValue>       stack = new Stack<IValue>();
	protected Stack<AnyUndo>      undo  = new Stack<AnyUndo>();
	protected Set<ITransactional> trans = new HashSet<ITransactional>();
	protected int nextCommand;
	protected int currCommand;
	
	public AbstractProcessor(IBuild build, IMoveLogger logger) {
		this.build  = build;
		this.logger = logger;
	}
	
	public IMoveLogger getLogger() {
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
		trans.add(logger);
	}
	
	public void incNextCommand(int delta) {
		nextCommand += delta;
	}

	public void execute(IDeferredCheck state, IEnvironment env) throws CommonException {
		clear();
		nextCommand = 0;
		currCommand = 0;
		while (nextCommand < build.getSize()) {
			ICommand c = build.getCommand(nextCommand);
			nextCommand++;
			currCommand++;
			if (c.isDeferred()) {
				state.addDeferredCommand(c);
				continue;
			}
			if (!c.execute(this, state, env)) {
				if (!rollback()) {
					break;
				}
			}
		}
	}
}
