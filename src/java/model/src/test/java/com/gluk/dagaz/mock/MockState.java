package com.gluk.dagaz.mock;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.exceptions.CommonException;

public class MockState implements IDeferredCheck {

	public boolean isDefined(String name) {
		return false;
	}

	public long getZobristHash() {
		return 0L;
	}

	public String getCurrentPosition() throws CommonException {
		throw new CommonException("Unsupported");
	}

	public IValue getFlag(String name, String pos) {
		return null;
	}

	public IValue getValue(String name) throws CommonException {
		return null;
	}

	public void setFlag(String name, String pos, IValue value) throws CommonException {}

	public void setValue(String name, IValue value) throws CommonException {}

	public IPiece getPiece(String pos) {
		return null;
	}

	public void setPiece(String pos, IPiece piece) throws CommonException {}

	public void changeAttribute(String pos, String name, IValue value) throws CommonException {}

	public void addToHand(String pos, IPiece piece) throws CommonException {}

	public void dropHand() throws CommonException {}

	public boolean navigate(String dir, IEnvironment env) throws CommonException {
		return false;
	}

	public void addDeferredCommand(ICommand c) {}

	public boolean check(IEnvironment env) throws CommonException {
		return true;
	}
}
