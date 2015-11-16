package com.gluk.dagaz.statements;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class OrStatement extends ShortCircuitStatement {

	@Override
	public void open(String name) throws CommonException {
		openFrame(IReserved.LOCAL_TRUE);
	}

	@Override
	public void close() throws CommonException {
		closeFrame(IReserved.LOCAL_FALSE);
	}
	
	@Override
	protected void exitFrame() throws CommonException {
		int currentOffset = build.getOffset();
		ICommand ifCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_IF, build);
		ifCommand.addArgument(ifOffset - currentOffset);
	}
}
