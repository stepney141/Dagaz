package com.gluk.dagaz.state;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.Value;

public class StateEnvironment implements IEnvironment {
	
	private IState state;
	private IEnvironment env;
	
	public StateEnvironment(State state, IEnvironment env) {
		this.state = state;
		this.env   = env;
	}

	public boolean isDefined(String name) throws CommonException {
		String pos = state.getCurrentPosition();
		if (name.equals(IReserved.STATE_POSITION)  ||
			name.equals(IReserved.STATE_IS_EMPTY)  ||
			name.equals(IReserved.STATE_NOT_EMPTY) ||
			name.equals(IReserved.STATE_IS_ENEMY)  ||
			name.equals(IReserved.STATE_NOT_ENEMY) ||
			name.equals(IReserved.STATE_IS_FRIEND) ||
			name.equals(IReserved.STATE_NOT_FRIEND)) {
			return pos != null;
			}
		if (name.equals(IReserved.STATE_PLAYER)    ||
			name.equals(IReserved.STATE_PIECE)) {
			if (pos != null) {
				IPiece p = state.getPiece(pos);
				return p != null;
			} else {
				return false;
			}
		}
		return state.isDefined(name) || env.isDefined(name);
	}

	public IValue get(String name) throws CommonException {
		if (name.equals(IReserved.STATE_POSITION)) {
			String pos = state.getCurrentPosition();
			if (pos == null) {
				throw new CommonException("Position unassigned");
			}
			return Value.create(pos);
		}
		if (name.equals(IReserved.STATE_PLAYER)) {
			String pos = state.getCurrentPosition();
			IPiece p = state.getPiece(pos);
			if (p == null) {
				return Value.create(false);
			}
			return Value.create(p.getOwner());
		}
		if (name.equals(IReserved.STATE_PIECE)) {
			String pos = state.getCurrentPosition();
			IPiece p = state.getPiece(pos);
			if (p == null) {
				return Value.create(false);
			}
			return Value.create(p.getName());
		}
		if (name.equals(IReserved.STATE_IS_EMPTY)) {
			String pos = state.getCurrentPosition();
			IPiece p = state.getPiece(pos);
			return Value.create(p == null);
		}
		if (name.equals(IReserved.STATE_NOT_EMPTY)) {
			String pos = state.getCurrentPosition();
			IPiece p = state.getPiece(pos);
			return Value.create(p != null);
		}
		if (name.equals(IReserved.STATE_IS_ENEMY)) {
			String pos = state.getCurrentPosition();
			IPiece p = state.getPiece(pos);
			if (p == null) {
				return Value.create(false);
			}
			return Value.create(!env.get(p.getOwner()).getBoolean());
		}
		if (name.equals(IReserved.STATE_NOT_ENEMY)) {
			String pos = state.getCurrentPosition();
			IPiece p = state.getPiece(pos);
			if (p == null) {
				return Value.create(true);
			}
			return env.get(p.getOwner());
		}
		if (name.equals(IReserved.STATE_IS_FRIEND)) {
			String pos = state.getCurrentPosition();
			IPiece p = state.getPiece(pos);
			if (p == null) {
				return Value.create(false);
			}
			return env.get(p.getOwner());
		}
		if (name.equals(IReserved.STATE_NOT_FRIEND)) {
			String pos = state.getCurrentPosition();
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
		if (state.isDefined(name)) {
			throw new CommonException("Value [" + name + "] can not be replaced");
		}
		env.let(name, value);
	}

	public void set(String name, IValue value) throws CommonException {
		if (state.isDefined(name)) {
			state.setValue(name, value);
		} else {
			env.set(name, value);
		}
	}

	public void del(String name) throws CommonException {
		if (state.isDefined(name)) {
			throw new CommonException("Value [" + name + "] can not be deleted");
		}
		env.del(name);
	}
}
