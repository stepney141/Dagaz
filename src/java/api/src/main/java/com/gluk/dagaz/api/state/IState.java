package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.rules.board.IBoard;

public interface IState extends IValueSet, IStateNavigation {
	IState getClone();
	int getTurnOrder();
	void setTurnOrder(int turnOrder);
	int getTurnNumber();
	void setTurnNumber(int turnNumber);
	boolean positionExists(String position);
	IPosition getPosition(String position);
	int getPositionsCount();
	boolean isEqual(IState state) throws CommonException;
	void addNextState(String move, IState nextState);
	boolean isInitialState();
	boolean isTerminalState();
	IValueSet setValue(String name, String value, boolean isClonable);
	boolean isRepeated(int count, boolean isStarted, int minTurnNumber, int turnOrder,  String name, Long hash);
	boolean isRepeated(IBoard board, int count, int minTurnNumber, int turnOrder, long hash, IState state) throws CommonException;
	boolean isRepeated(IBoard board, int count, int minTurnNumber, int turnOrder) throws CommonException;
}
