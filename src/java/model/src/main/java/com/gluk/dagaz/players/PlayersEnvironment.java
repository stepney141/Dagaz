package com.gluk.dagaz.players;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Value;

public class PlayersEnvironment implements IEnvironment {
	
	private Players players;
	private int numOrder; 
	
	public PlayersEnvironment(Players players, int numOrder) {
		this.players = players;
		this.numOrder = numOrder;
	}

	public boolean isDefined(String name) throws CommonException {
		if (name.equals(IReserved.PLAYER_CURRENT)   ||
			name.equals(IReserved.PLAYER_NEXT)      ||
			name.equals(IReserved.PLAYER_TURN)      ||
			name.equals(IReserved.PLAYER_ORDER)) {
			return true;
		}
		String player = players.getPlayer(numOrder);
		return players.isDefined(player, name);
	}

	public IValue get(String name) throws CommonException {
		if (name.equals(IReserved.PLAYER_TURN)) {
			int turn = players.getTurn(numOrder);
			return Value.create(turn);
		}
		if (name.equals(IReserved.PLAYER_ORDER)) {
			int ord = players.getOrder(numOrder);
			return Value.create(ord);
		}
		if (name.equals(IReserved.PLAYER_NEXT)) {
			String player = players.getPlayer(numOrder + 1);
			return Value.create(player);
		}
		String player = players.getPlayer(numOrder);
		if (name.equals(IReserved.PLAYER_CURRENT)) {
			return Value.create(player);
		}
		if (players.isDefined(player, name)) {
			return players.get(player, name);
		}
		throw new CommonException("Unsupported");
	}

	public void let(String name, IValue value) throws CommonException {
		throw new CommonException("Unsupported");
	}

	public void set(String name, IValue value) throws CommonException {
		throw new CommonException("Unsupported");
	}

	public void del(String name) throws CommonException {
		throw new CommonException("Unsupported");
	}
}
