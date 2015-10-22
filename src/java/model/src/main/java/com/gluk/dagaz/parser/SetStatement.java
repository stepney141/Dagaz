package com.gluk.dagaz.parser;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class SetStatement extends AbstractStatement {
	
	private String name = null;
	private ICommand setCommand = null;
	
	private void addSetCommand() throws CommonException {
		setCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_SET, build);
		build.addCommand(setCommand);
		setCommand.addArgument(name);
	}

	@Override
	public void addOperand(String name) throws CommonException {
		if (this.name != null) {
			if (setCommand != null) {
				throw new CommonException("Syntax error");
			}
			ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
			build.addCommand(getCommand);
			getCommand.addArgument(name);
			addSetCommand();
		}
		this.name = name;
	}

	@Override
	public void close(IStatementInternal stmt) throws CommonException {
		if ((name == null) || (setCommand != null)) {
			throw new CommonException("Syntax error");
		}
		addSetCommand();
	}

	@Override
	public void open(IStatementInternal stmt) throws CommonException {
		stmt.setQuoted();
	}
}
