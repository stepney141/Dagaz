package com.gluk.dagaz.players;

import com.gluk.dagaz.api.IEnvironment;
import com.gluk.dagaz.api.IReserved;
import com.gluk.dagaz.api.IValue;
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
			name.equals(IReserved.PLAYER_IS_FRIEND) ||
			name.equals(IReserved.PLAYER_IS_ENEMY)  ||
			name.equals(IReserved.PLAYER_DIR)       ||
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
		String player = players.getPlayer(numOrder);
		if (name.equals(IReserved.PLAYER_CURRENT)) {
			return Value.create(player);
		}
		if (name.equals(IReserved.PLAYER_NEXT)) {
			return Value.create(player);
		}
		if (players.isDefined(player, name)) {
			return get(IReserved.PLAYER_DIR, name);
		}
		throw new CommonException("Unsupported");
	}

	public IValue get(String name, String opt) throws CommonException {
		String player = players.getPlayer(numOrder);
		if (name.equals(IReserved.PLAYER_IS_FRIEND)) {
			boolean f = player.equals(opt);
			return Value.create(f);
		}
		if (name.equals(IReserved.PLAYER_IS_ENEMY)) {
			boolean f = !player.equals(opt);
			return Value.create(f);
		}
		if (name.equals(IReserved.PLAYER_DIR)) {
			String dir = players.getDirection(player, opt);
			return Value.create(dir);
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
