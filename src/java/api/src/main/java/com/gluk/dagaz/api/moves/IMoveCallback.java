package com.gluk.dagaz.api.moves;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;

public interface IMoveCallback {
	void addCondition(int moveNum, ICondition condition) throws CommonException;
	void addMovePart(int moveNum, String move, String mode);
	void checkMoves(IEnvironment env) throws CommonException;
}
