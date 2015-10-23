package com.gluk.dagaz.statements;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public abstract class ShortCircuitStatement extends AbstractExpression {

	protected int ifOffset = 0;
	protected int exitOffset = 0;
	protected ICommand exitCommand = null;
	
	protected void openFrame(String name) throws CommonException {
		int enterOffset = build.getOffset();
		ICommand enterCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_JUMP, build);
		build.addCommand(enterCommand);
		ifOffset = build.getOffset();
		ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		build.addCommand(getCommand);
		getCommand.addArgument(name);
		exitOffset = build.getOffset();
		exitCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_JUMP, build);
		build.addCommand(exitCommand);
		int currentOffset = build.getOffset();
		enterCommand.addArgument(currentOffset - enterOffset);
	}
	
	protected void closeFrame(String name) throws CommonException {
		ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		build.addCommand(getCommand);
		getCommand.addArgument(name);
		int currentOffset = build.getOffset();
		exitCommand.addArgument(currentOffset - exitOffset);
	}	

	@Override
	public void addOperand(String name) throws CommonException {
		ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		build.addCommand(getCommand);
		getCommand.addArgument(name);
		exitFrame();
	}

	@Override
	public void close(IStatementInternal stmt) throws CommonException {
		exitFrame();
	}
	
	protected abstract void exitFrame() throws CommonException;
}
