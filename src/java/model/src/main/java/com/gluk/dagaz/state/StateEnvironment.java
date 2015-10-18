package com.gluk.dagaz.state;

import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Value;

public class StateEnvironment implements IEnvironment {
	
	private IState state;
	private IEnvironment env;
	
	public StateEnvironment(IState state, IBoard board, IEnvironment env) {
		this.state = state;
		this.env   = env;
	}

	public boolean isDefined(String name) throws CommonException {
		if (name.equals(IReserved.STATE_POSITION)  ||
			name.equals(IReserved.STATE_PLAYER)    ||
			name.equals(IReserved.STATE_PIECE)     ||
			name.equals(IReserved.STATE_IS_EMPTY)  ||
			name.equals(IReserved.STATE_NOT_EMPTY) ||
			name.equals(IReserved.STATE_IS_ENEMY)  ||
			name.equals(IReserved.STATE_NOT_ENEMY) ||
			name.equals(IReserved.STATE_IS_FRIEND) ||
			name.equals(IReserved.STATE_NOT_FRIEND)) {
			return true;
		}
		return state.isDefined(name) || env.isDefined(name);
	}

	public IValue get(String name) throws CommonException {
		if (name.equals(IReserved.STATE_POSITION)) {
			return Value.create(state.getPosition());
		}
		if (name.equals(IReserved.STATE_PLAYER)) {
			String pos = state.getPosition();
			IPiece p = state.getPiece(pos);
			if (p == null) {
				return Value.create(false);
			}
			return Value.create(p.getOwner());
		}
		if (name.equals(IReserved.STATE_PIECE)) {
			String pos = state.getPosition();
			IPiece p = state.getPiece(pos);
			if (p == null) {
				return Value.create(false);
			}
			return Value.create(p.getName());
		}
		if (name.equals(IReserved.STATE_IS_EMPTY)) {
			String pos = state.getPosition();
			IPiece p = state.getPiece(pos);
			return Value.create(p == null);
		}
		if (name.equals(IReserved.STATE_NOT_EMPTY)) {
			String pos = state.getPosition();
			IPiece p = state.getPiece(pos);
			return Value.create(p != null);
		}
		if (name.equals(IReserved.STATE_IS_ENEMY)) {
			String pos = state.getPosition();
			IPiece p = state.getPiece(pos);
			if (p == null) {
				return Value.create(false);
			}
			return Value.create(!env.get(p.getOwner()).getBoolean());
		}
		if (name.equals(IReserved.STATE_NOT_ENEMY)) {
			String pos = state.getPosition();
			IPiece p = state.getPiece(pos);
			if (p == null) {
				return Value.create(true);
			}
			return env.get(p.getOwner());
		}
		if (name.equals(IReserved.STATE_IS_FRIEND)) {
			String pos = state.getPosition();
			IPiece p = state.getPiece(pos);
			if (p == null) {
				return Value.create(false);
			}
			return env.get(p.getOwner());
		}
		if (name.equals(IReserved.STATE_NOT_FRIEND)) {
			String pos = state.getPosition();
			IPiece p = state.getPiece(pos);
			if (p == null) {
				return Value.create(true);
			}
			return Value.create(!env.get(p.getOwner()).getBoolean());
		}
		if (state.isDefined(name)) {
			IValue v = state.getValue(name);
			if (v != null) {
				return v;
			}
			return Value.create(state.navigate(name, env));
		}
		return env.get(name);
	}

	public void let(String name, IValue value) throws CommonException {
		env.let(name, value);
	}

	public void set(String name, IValue value) throws CommonException {
		env.set(name, value);
	}

	public void del(String name) throws CommonException {
		env.del(name);
	}
}
