package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.state.LocalEnvironment;
import com.gluk.dagaz.state.PlayersEnvironment;
import com.gluk.dagaz.state.State;
import com.gluk.dagaz.state.StateEnvironment;

public class Processor extends AbstractProcessor {

	public Processor(IBuild build, IMoveLogger logger) {
		super(build, logger);
	}
	
	public void execute(int numOrder, State old, IEnvironment ge) throws CommonException, CloneNotSupportedException {
		PlayersEnvironment pe = new PlayersEnvironment(build.getPlayers(), numOrder, ge);
		for (String pos: getBoard().getPositions()) {
			IPiece p = old.getPiece(pos);
			if (p == null) continue;
			if (!build.getPieceType().isEmpty()) {
				if (!p.getName().equals(build.getPieceType())) continue;
			}
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

	public IBoard getBoard() {
		return build.getBoard();
	}
}
