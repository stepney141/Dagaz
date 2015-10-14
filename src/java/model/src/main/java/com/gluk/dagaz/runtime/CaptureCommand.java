package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;

public class CaptureCommand extends AbstractCommand {

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		super.execute(state, env);
		String pos = state.getPosition();
		state.setPiece(pos, null);
		return true;
	}
}
