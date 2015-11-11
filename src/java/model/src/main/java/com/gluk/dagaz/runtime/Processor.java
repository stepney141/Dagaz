package com.gluk.dagaz.runtime;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.model.Board;
import com.gluk.dagaz.model.Players;
import com.gluk.dagaz.state.LocalEnvironment;
import com.gluk.dagaz.state.PlayersEnvironment;
import com.gluk.dagaz.state.State;
import com.gluk.dagaz.state.StateEnvironment;

public class Processor extends AbstractProcessor {

	private Players players;
	private String pieceType;
	
	private Set<String> localNames = new HashSet<String>();
	private List<Integer> fixups = new ArrayList<Integer>();
	
	public Processor(String pieceType, Players players, Board board, IMoveLogger logger) {
		super(board, logger);
		this.players = players;
		this.pieceType = pieceType;
	}
	
	public void addFixup(int offset) {
		fixups.add(offset);
	}
	
	public void fixup() throws CommonException {
		int currentOffset = commands.size();
		for (Integer offset: fixups) {
			ICommand c = commands.get(offset);
			c.addArgument(currentOffset - offset);
		}
	}
	
	public void setDeferred(int offset) {
		for (int ix = offset; ix < commands.size(); ix++) {
			commands.get(ix).setDeferred();
		}
	}
	
	public void addLocalName(String name) {
		localNames.add(name);
	}

	public boolean isLocalName(String name) {
		return localNames.contains(name);
	}
	
	public void execute(int numOrder, State old, IEnvironment ge) throws CommonException, CloneNotSupportedException {
		PlayersEnvironment pe = new PlayersEnvironment(players, numOrder, ge);
		for (String pos: getBoard().getPositions()) {
			IPiece p = old.getPiece(pos);
			if (p == null) continue;
			if (!p.getName().equals(pieceType)) continue;
			clear();
			State state = (State)old.clone();
			state.setCurrentPosition(pos);
			trans.add(state);
			StateEnvironment se = new StateEnvironment(state, pe);
			LocalEnvironment env = new LocalEnvironment(se);
			trans.add(env);
			execute(state, env);
		}
	}
}
