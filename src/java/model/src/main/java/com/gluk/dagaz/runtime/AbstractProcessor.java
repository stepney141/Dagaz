package com.gluk.dagaz.runtime;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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
import com.gluk.dagaz.state.LocalEnvironment;
import com.gluk.dagaz.state.State;
import com.gluk.dagaz.state.StateEnvironment;
import com.gluk.dagaz.utils.AnyUndo;

public abstract class AbstractProcessor implements IProcessor {
	
	private IMoveLogger logger;
	
	protected List<IBuild>       builds = new ArrayList<IBuild>();
	protected Stack<IValue>       stack = new Stack<IValue>();
	protected Stack<AnyUndo>      undo  = new Stack<AnyUndo>();
	protected Set<ITransactional> trans = new HashSet<ITransactional>();
	
	protected int nextCommand;
	protected int currCommand;
	
	public AbstractProcessor(IMoveLogger logger) {
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
		nextCommand = 0;
		currCommand = 0;
		logger.clear();
		stack.clear();
		trans.clear();
		trans.add(logger);
	}
	
	public void incNextCommand(int delta) {
		nextCommand += delta;
	}

	public void addBuild(IBuild build) {
		builds.add(build);
	}
	
	protected IEnvironment createEnvironment(State state, IEnvironment pe) throws CloneNotSupportedException {
		StateEnvironment se = new StateEnvironment(state, pe);
		LocalEnvironment env = new LocalEnvironment(se);
		trans.add(env);
		return env;
	}
	
	private ICommand getCommand(IBuild build, IDeferredCheck state) throws CommonException {
		ICommand c = build.getCommand(nextCommand);
		nextCommand++;
		currCommand++;
		if (c.isDeferred()) {
			state.addDeferredCommand(c);
			return null;
		}
		return c;
	}
	
	private void execute(IBuild build, IDeferredCheck state, IEnvironment env) throws CommonException {
		while (nextCommand < build.getSize()) {
			ICommand c = getCommand(build, state);
			if (c == null) continue;
			if (!c.execute(this, state, env)) {
				if (!rollback()) {
					break;
				}
			}
		}
	}

	public void execute(State old, IEnvironment pe) throws CommonException {
		for (IBuild build: builds) {
			try {
				clear();
				State state = (State)old.clone();
				trans.add(state);
				IEnvironment env = createEnvironment(state, pe);
				execute(build, state, env);
			} catch (CloneNotSupportedException e) {
				throw new CommonException(e.toString(), e);
			}
		}
	}
}
