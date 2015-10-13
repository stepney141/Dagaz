package com.gluk.dagaz.runtime;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Stack;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.state.IEnvironment;
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

public class Processor {

	private Players players;
	private Board board;
	private List<ICommand> commands = new ArrayList<ICommand>();
	private Set<ITransactional> trans = new HashSet<ITransactional>();
	
	public MoveGenerator gen;
	public Stack<IValue> stack = new Stack<IValue>();
	public int nextCommand;
	public Stack<AnyUndo> undo = new Stack<AnyUndo>(); 
	
	public Processor(Players players, Board board, MoveGenerator gen) {
		this.players = players;
		this.board = board;
		this.gen = gen;
	}

	public void savepoint() {
		for (ITransactional t: trans) {
			t.savepoint();
		}
		undo.push(new AnyUndo(nextCommand - 1));
                // TODO: Save stack

	}

	public boolean rollback() throws CommonException {
		if (undo.isEmpty()) {
			return false;
		}
		for (ITransactional t: trans) {
			t.rollback();
		}
		nextCommand = undo.peek().getCommand();
                // TODO: Rollback stack

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

	public void execute(int numOrder, State old) throws CommonException, CloneNotSupportedException {
		PlayersEnvironment pe = new PlayersEnvironment(players, numOrder);
		for (String pos: board.getPositions()) {
                        // TODO: Check Piece type
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
