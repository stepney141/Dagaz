package com.gluk.dagaz.statements;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class WhileStatement extends AbstractStatement {
	
	private int baseOffset = 0;
	private int ifOffset = 0;
	private ICommand ifCommand = null;

	private void addDropCommand() throws CommonException {
		CommandFactory.getInstance().createCommand(IReserved.CMD_DROP, build);
	}

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
		jumpCommand.addArgument(baseOffset - currentOffset);
		currentOffset = build.getOffset();
		ifCommand.addArgument(currentOffset - ifOffset);
	}
	
	private void addIfCommand() throws CommonException {
		CommandFactory.getInstance().createCommand(IReserved.CMD_NOT, build);
		ifOffset = build.getOffset();
		ifCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_IF, build);
	}
	
	@Override
	public void addOperand(String name) throws CommonException {
		ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		getCommand.addArgument(name);
		if (ifCommand == null) {
			addIfCommand();
		} else {
			addDropCommand();
		}
	}

	@Override
	public void close(IStatementInternal stmt) throws CommonException {
		if (ifCommand == null) {
			addIfCommand();
		} else if (stmt.isExpression()) {
			addDropCommand();
		} 
	}
}
