package com.gluk.dagaz.statements;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class SeqStatement extends AbstractStatement {
	
	private void addDropCommand() throws CommonException {
		CommandFactory.getInstance().createCommand(IReserved.CMD_DROP, build);
	}

	@Override
	public void addOperand(String name) throws CommonException {
		ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		getCommand.addArgument(name);
		addDropCommand();
	}
	
	@Override
	public void close(IStatementInternal stmt) throws CommonException {
		if (stmt.isExpression()) {
			addDropCommand();
		}
	}
}
