package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;

public class TakeCommand extends AbstractCommand { // --

	public TakeCommand(Processor processor) {
		super(processor);
	}

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		String pos = state.getPosition();
		IPiece piece = state.getPiece(pos);
		state.setPiece(pos, null);
		state.addToHand(pos, piece);
		return true;
	}
}
