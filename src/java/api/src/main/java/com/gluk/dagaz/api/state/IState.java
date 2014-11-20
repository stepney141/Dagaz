package com.gluk.dagaz.api.state;

public interface IState extends IValue, IStateNavigation {
	IState getClone();
	int getTurnOrder();
	void setTurnOrder(int turnOrder);
	int getTurnNumber();
	void setTurnNumber(int turnNumber);
	IPosition getPosition(String position);
	void addNextState(String move, IState nextState);
	boolean isInitialState();
	boolean isTerminalState();
	IValue setValue(String name, String value, boolean isClonable);
}
