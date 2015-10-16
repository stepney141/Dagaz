package com.gluk.dagaz.parser;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class IfStatement extends AbstractStatement {

	private int jumpOffset = 0;
	private ICommand jumpCommand = null;
	
	private void addIfCommand() throws CommonException {
		int ifOffset = build.getOffset();
		ICommand ifCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_IF, build);
		build.addCommand(ifCommand);
		jumpOffset = build.getOffset();
		jumpCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_JUMP, build);
		build.addCommand(jumpCommand);
		int currentOffset = build.getOffset();
		ifCommand.addArgument(currentOffset - ifOffset);
	}
	
	@Override
	public void addOperand(String name) throws CommonException {
		ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		build.addCommand(getCommand);
		getCommand.addArgument(name);
		if (jumpCommand == null) {
			addIfCommand();
		} else if (IReserved.STMT_ELSE.equals(name)) {
			if (jumpCommand == null) {
				throw new CommonException("Syntax error");
			}
			int offset = build.getOffset();
			ICommand cmd = CommandFactory.getInstance().createCommand(IReserved.CMD_JUMP, build);
			build.addCommand(cmd);
			int currentOffset = build.getOffset();
			jumpCommand.addArgument(currentOffset - jumpOffset);
			jumpOffset = offset;
			jumpCommand = cmd;
		} else {
			ICommand dropCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_DROP, build);
			build.addCommand(dropCommand);
		}
	}

	@Override
	public void closeChild() throws CommonException {
		super.closeChild();
		if (jumpCommand == null) {
			addIfCommand();
		}
	}

	@Override
	public void close() throws CommonException {
		if (jumpCommand == null) {
			throw new CommonException("Syntax error");
		}
		int currentOffset = build.getOffset();
		jumpCommand.addArgument(currentOffset - jumpOffset);
	}
}
