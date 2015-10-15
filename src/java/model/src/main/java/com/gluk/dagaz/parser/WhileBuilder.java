package com.gluk.dagaz.parser;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class WhileBuilder extends AbstractBuilder {
	
	private int baseOffset = 0;
	private int ifOffset = 0;
	private ICommand ifCommand = null;

	@Override
	public void open(String name) throws CommonException {
		baseOffset = build.getOffset();
	}

	@Override
	public void close() throws CommonException {
		if (ifCommand == null) {
			throw new CommonException("Condition statement not found");
		}
		int currentOffset = build.getOffset();
		ICommand jumpCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_JUMP, build);
		build.addCommand(jumpCommand);
		jumpCommand.addArgument(baseOffset - currentOffset);
		currentOffset = build.getOffset();
		ifCommand.addArgument(currentOffset - ifOffset);
	}
	
	private void addIfCommand() throws CommonException {
		ICommand notCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_NOT, build);
		build.addCommand(notCommand);
		ifOffset = build.getOffset();
		ifCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_IF, build);
		build.addCommand(ifCommand);
	}
	
	@Override
	public void addOperand(String name) throws CommonException {
		ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		build.addCommand(getCommand);
		getCommand.addArgument(name);
		if (ifCommand == null) {
			addIfCommand();
		} else {
			ICommand dropCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_DROP, build);
			build.addCommand(dropCommand);
		}
	}

	@Override
	public void closeChild() throws CommonException {
		super.closeChild();
		if (ifCommand == null) {
			addIfCommand();
		}
	}
}
