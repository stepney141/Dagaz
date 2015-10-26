package com.gluk.dagaz.state;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.model.Players;
import com.gluk.dagaz.utils.Value;

public class PlayersEnvironment implements IEnvironment {
	
	private Players players;
	private int numOrder;
	private IEnvironment env;
	
	public PlayersEnvironment(Players players, int numOrder, IEnvironment env) {
		this.players = players;
		this.numOrder = numOrder;
		this.env = env;
	}

	public boolean isDefined(String name) throws CommonException {
		if (name.equals(IReserved.PLAYER_CURRENT)   ||
			name.equals(IReserved.PLAYER_NEXT)      ||
			name.equals(IReserved.PLAYER_TURN)      ||
			name.equals(IReserved.PLAYER_ORDER)) {
			return true;
		}
		return players.isDefined(name) || env.isDefined(name);
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
		if (players.isDefined(name)) {
			return players.get(player, name);
		}
		return env.get(name);
	}

	public void let(String name, IValue value) throws CommonException {
		if (name.equals(IReserved.PLAYER_CURRENT)   ||
			name.equals(IReserved.PLAYER_NEXT)      ||
			name.equals(IReserved.PLAYER_TURN)      ||
			name.equals(IReserved.PLAYER_ORDER)     ||
			players.isDefined(name)) {
			throw new CommonException("Unsupported");
		}
		env.let(name, value);
	}

	public void set(String name, IValue value) throws CommonException {
		if (name.equals(IReserved.PLAYER_CURRENT)   ||
			name.equals(IReserved.PLAYER_NEXT)      ||
			name.equals(IReserved.PLAYER_TURN)      ||
			name.equals(IReserved.PLAYER_ORDER)     ||
			players.isDefined(name)) {
			throw new CommonException("Unsupported");
		}
		env.set(name, value);
	}

	public void del(String name) throws CommonException {
		if (name.equals(IReserved.PLAYER_CURRENT)   ||
			name.equals(IReserved.PLAYER_NEXT)      ||
			name.equals(IReserved.PLAYER_TURN)      ||
			name.equals(IReserved.PLAYER_ORDER)     ||
			players.isDefined(name)) {
			throw new CommonException("Unsupported");
		}
		env.del(name);
	}
}
