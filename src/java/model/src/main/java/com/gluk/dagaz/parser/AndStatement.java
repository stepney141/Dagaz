package com.gluk.dagaz.parser;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class AndStatement extends ShortCircuitStatement {

	@Override
	public void open(String name) throws CommonException {
		openFrame(IReserved.LOCAL_FALSE);
	}

	@Override
	public void close() throws CommonException {
		closeFrame(IReserved.LOCAL_TRUE);
	}
	
	@Override
	protected void exitFrame() throws CommonException {
		ICommand notCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_NOT, build);
		build.addCommand(notCommand);
		int currentOffset = build.getOffset();
		ICommand ifCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_IF, build);
		build.addCommand(ifCommand);
		ifCommand.addArgument(ifOffset - currentOffset);
	}
}
