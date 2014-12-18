package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.rules.board.IBoard;

public interface ISession extends IStateNavigation {
	IState getInitialState();
	IState getCurrentState();
	boolean isSituationRepeated(int count, int deep, String name, Long hash);
	boolean isSituationRepeated(IBoard board, int count, int deep) throws CommonException;
	boolean isPositionRepeated(int count, int deep, String name, Long hash);
	boolean isPositionRepeated(IBoard board, int count, int deep) throws CommonException;
}
