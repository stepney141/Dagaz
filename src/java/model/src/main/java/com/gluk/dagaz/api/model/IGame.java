package com.gluk.dagaz.api.model;

import com.gluk.dagaz.api.state.IState;

public interface IGame {
	IBoard getBoard();
	IPlayers getPlayers();
	IState getInitialState();
}
