package com.gluk.dagaz.model;

import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.model.IGame;
import com.gluk.dagaz.api.model.IPlayers;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.state.State;

public class Game implements IGame {
	
	IBoard board;
	IPlayers players;
	IState initialState;
	
	public Game(Board board) {
		this.board = board;
		this.players = new Players();
		this.initialState = new State(board);
	}

	public IBoard getBoard() {
		return board;
	}

	public IPlayers getPlayers() {
		return players;
	}

	public IState getInitialState() {
		return initialState;
	}
}
