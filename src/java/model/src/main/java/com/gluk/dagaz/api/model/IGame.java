package com.gluk.dagaz.api.model;

import com.gluk.dagaz.api.state.IState;

public interface IGame {
	IPlayers getPlayers();
	IBoard getBoard();
	IState getInitialState();
}
