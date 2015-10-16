package com.gluk.dagaz.runtime;

import com.gluk.dagaz.exceptions.CommonException;

public abstract class AbstractUnaryCommand extends AbstractCommand {

	public void addArgument(Object arg) throws CommonException {
		if (!(arg instanceof Integer)) {
			throw new CommonException("Invalid argument");
		}
		int arity = (Integer)arg;
		if (arity != 1) {
			throw new CommonException("Bad arity [" + Integer.toString(arity) + "]");
		}
	}
}
