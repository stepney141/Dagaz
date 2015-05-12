package com.gluk.dagaz.api.moves;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.state.IState;

public interface IMoveGenerator {
	void   getMoves(IState state, IMoveAssembler callback) throws CommonException;
	IState applyMove(IState state, String move, String mode);
}
