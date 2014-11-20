package com.gluk.dagaz.api.rules;

import com.gluk.dagaz.api.exceptions.MoveListException;
import com.gluk.dagaz.api.state.IState;

public interface IMoveExecutorCallback {
	int createMove(int moveIndex, String name, String params) throws MoveListException;
	void setStartPosition(int moveIndex, String position) throws MoveListException;
	void setEndPosition(int moveIndex, String position) throws MoveListException;
	void setCapturedFlag(int moveIndex) throws MoveListException;
	void setNewState(int moveIndex, IState newState) throws MoveListException;
	void deleteMove(int moveIndex) throws MoveListException;
}
