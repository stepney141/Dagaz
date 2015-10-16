package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.exceptions.CommonException;

public class TakeCommand extends AbstractCommand { // --

	@Override
	public boolean execute(IDeferredCheck state, IEnvironment env) throws CommonException {
		super.execute(state, env);
		String pos = state.getPosition();
		IPiece piece = state.getPiece(pos);
		state.setPiece(pos, null);
		state.addToHand(pos, piece);
		return true;
	}
}
