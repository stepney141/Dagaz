package com.gluk.dagaz.runtime;

import com.gluk.dagaz.exceptions.CommonException;

public abstract class AbstractBinaryCommand extends AbstractCommand {

	public AbstractBinaryCommand(String mnemonic) {
		super(mnemonic);
	}

	public void addArgument(Object arg) throws CommonException {
		if (!(arg instanceof Integer)) {
			throw new CommonException("Invalid argument");
		}
		int arity = (Integer)arg;
		if (arity != 2) {
			throw new CommonException("Bad arity [" + Integer.toString(arity) + "]");
		}
		super.addArgument(arg);
	}
}
