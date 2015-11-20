package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.model.IPlayers;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.state.PlayersEnvironment;
import com.gluk.dagaz.state.State;

public class Processor extends AbstractProcessor {

	public Processor(IMoveLogger logger) {
		super(logger);
	}
	
	public void execute(int numOrder, IPlayers players, State old, IEnvironment ge) throws CommonException, CloneNotSupportedException {
		PlayersEnvironment pe = new PlayersEnvironment(players, numOrder, ge);
		for (IBuild build: builds) {
			for (String pos: old.getBoard().getPositions()) {
				IPiece p = old.getPiece(pos);
				if (p == null) continue;
				if (!build.getPieceType().isEmpty()) {
					if (!p.getName().equals(build.getPieceType())) continue;
				}
				clear();
				State state = (State)old.clone();
				trans.add(state);
				state.setCurrentPosition(pos);
				IEnvironment env = createEnvironment(state, pe);
				execute(state, env);
			}
		}
	}
}
