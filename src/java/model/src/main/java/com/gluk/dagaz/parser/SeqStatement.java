package com.gluk.dagaz.parser;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class SeqStatement extends AbstractStatement {
	
	private void addDropCommand() throws CommonException {
		ICommand dropCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_DROP, build);
		build.addCommand(dropCommand);
	}

	@Override
	public void addOperand(String name) throws CommonException {
		ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		build.addCommand(getCommand);
		getCommand.addArgument(name);
		addDropCommand();
	}
	
	@Override
	public void close(IStatementInternal stmt) throws CommonException {
		addDropCommand();
	}
}
