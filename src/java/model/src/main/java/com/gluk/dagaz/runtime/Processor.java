package com.gluk.dagaz.runtime;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Stack;

import com.gluk.dagaz.api.application.IMoveGenerator;
import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.api.state.ITransactional;
import com.gluk.dagaz.board.Board;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.players.Players;
import com.gluk.dagaz.players.PlayersEnvironment;
import com.gluk.dagaz.state.LocalEnvironment;
import com.gluk.dagaz.state.MoveGenerator;
import com.gluk.dagaz.state.State;
import com.gluk.dagaz.state.StateEnvironment;
import com.gluk.dagaz.utils.AnyUndo;

public class Processor implements IProcessor {

	private Players players;
	private Board board;
	private List<ICommand> commands = new ArrayList<ICommand>();
	private Set<ITransactional> trans = new HashSet<ITransactional>();
	
	private MoveGenerator gen;
	private Stack<IValue> stack = new Stack<IValue>();
	private int nextCommand;
	private Stack<AnyUndo> undo = new Stack<AnyUndo>(); 
	
	public Processor(Players players, Board board, MoveGenerator gen) {
		this.players = players;
		this.board = board;
		this.gen = gen;
	}
	
	public IMoveGenerator getMoveGenerator() {
		return gen;
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

	public void savepoint() {
		for (ITransactional t: trans) {
			t.savepoint();
		}
		AnyUndo u = new AnyUndo(nextCommand - 1);
		for (IValue v: stack) {
			u.saveStack(v);
		}
		undo.push(u);
	}

	public boolean rollback() throws CommonException {
		if (undo.isEmpty()) {
			return false;
		}
		for (ITransactional t: trans) {
			t.rollback();
		}
		nextCommand = undo.peek().getCommand();
		stack = undo.peek().getStack();
		return true;
	}
	
	private void clear() {
		gen.clear();
		stack.clear();
		trans.clear();
		trans.add(gen);
	}
	
	public void addCommand(ICommand command) {
		commands.add(command);
	}

	public void execute(int numOrder, String pieceType, State old) throws CommonException, CloneNotSupportedException {
		PlayersEnvironment pe = new PlayersEnvironment(players, numOrder);
		for (String pos: board.getPositions()) {
			IPiece p = old.getPiece(pos);
			if (p == null) continue;
			if (!p.getName().equals(pieceType)) continue;
			clear();
			State state = (State)old.clone();
			state.setCurrentPosition(pos);
			trans.add(state);
			StateEnvironment se = new StateEnvironment(state, board, pe);
			LocalEnvironment env = new LocalEnvironment(se);
			trans.add(env);
			execute(state, env);
			gen.endMove();
		}
	}
	
	private void execute(IState state, IEnvironment env) throws CommonException {
		nextCommand = 0;
		while (nextCommand < commands.size()) {
			ICommand c = commands.get(nextCommand);
			nextCommand++;
			if (!c.execute(state, env)) {
				if (!rollback()) {
					break;
				}
			}
		}
	}
}
