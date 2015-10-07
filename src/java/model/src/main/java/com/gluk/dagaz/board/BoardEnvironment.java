package com.gluk.dagaz.board;

import java.util.Stack;

import com.gluk.dagaz.api.IEnvironment;
import com.gluk.dagaz.api.IReserved;
import com.gluk.dagaz.api.ITransactional;
import com.gluk.dagaz.api.IValue;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Value;

// TODO: BOARD_ZONE

public class BoardEnvironment implements IEnvironment, ITransactional {
	
	private Board board;
	private IEnvironment env;
	private String position = "";
	private Stack<String> stack = new Stack<String>();
	
	public BoardEnvironment(Board board, IEnvironment playersEnv) {
		this.board = board;
		this.env = playersEnv;
	}

	public void savepoint() {
		stack.push(position);
	}

	public void rollback() throws CommonException {
		if (stack.isEmpty()) {
			throw new CommonException("Internal Exception");
		}
		position = stack.pop();
	}
	
	public boolean isDefined(String name) throws CommonException {
		if (name.equals(IReserved.BOARD_POSITION) ||
			name.equals(IReserved.BOARD_IN_ZONE)  ||
			name.equals(IReserved.BOARD_NOT_ZONE) ||
			name.equals(IReserved.BOARD_ZONE)) {
			return true;
		}
		return board.isDefined(name) || env.isDefined(name);
	}

	public void let(String name, IValue value) throws CommonException {
		env.let(name, value);
	}

	public IValue get(String name) throws CommonException {
		if (name.equals(IReserved.BOARD_POSITION)) {
			if (position.isEmpty()) {
				throw new CommonException("Position not assigned");
			}
			return Value.create(position);
		}
		if (name.equals(IReserved.BOARD_IN_ZONE)  || 
			name.equals(IReserved.BOARD_NOT_ZONE) ||
			name.equals(IReserved.BOARD_ZONE)) {
			throw new CommonException("Unsupported");
		}
		if (board.isDefined(name)) {
			if (env.isDefined(name)) {
				name = env.get(name).getString();
			}
			String to = board.navigate(name, position);
			if (to.isEmpty()) {
				return Value.create(false);
			}
			position = to;
			return Value.create(true);
		}
		return env.get(name);
	}

	public IValue get(String name, String opt) throws CommonException {
		if (name.equals(IReserved.BOARD_IN_ZONE)) {
			if (position.isEmpty()) {
				throw new CommonException("Position not assigned");
			}
			String player = env.get(IReserved.PLAYER_CURRENT).getString();
			return Value.create(board.inZone(opt, player, position));
		}
		if (name.equals(IReserved.BOARD_NOT_ZONE)) {
			if (position.isEmpty()) {
				throw new CommonException("Position not assigned");
			}
			String player = env.get(IReserved.PLAYER_CURRENT).getString();
			return Value.create(!board.inZone(opt, player, position));
		}
		if (name.equals(IReserved.BOARD_POSITION) ||
			name.equals(IReserved.BOARD_ZONE)) {
			throw new CommonException("Unsupported");
		}
		return env.get(name, opt);
	}

	public void set(String name, IValue value) throws CommonException {
		if (name.equals(IReserved.BOARD_POSITION)) {
			position = value.getString();
		}
		if (name.equals(IReserved.BOARD_IN_ZONE)  || 
			name.equals(IReserved.BOARD_NOT_ZONE) ||
			name.equals(IReserved.BOARD_ZONE)) {
			throw new CommonException("Unsupported");
		}
		env.set(name, value);
	}

	public void del(String name) throws CommonException {
		if (name.equals(IReserved.BOARD_POSITION) ||
			name.equals(IReserved.BOARD_IN_ZONE)  ||
			name.equals(IReserved.BOARD_NOT_ZONE) ||
			name.equals(IReserved.BOARD_ZONE)) {
			throw new CommonException("Unsupported");
		}
		env.del(name);
	}
}
