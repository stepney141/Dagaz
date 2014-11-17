package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.InvalidPositionException;
import com.gluk.dagaz.api.exceptions.TurnOrderException;

public interface IState extends IValue, IStateChangePieces {
	IState clone();
	int getTurnOrder();
	void setTurnOrder(int turnOrder) throws TurnOrderException;
	IPosition getPosition(String position) throws InvalidPositionException;
	String getHash();
}
