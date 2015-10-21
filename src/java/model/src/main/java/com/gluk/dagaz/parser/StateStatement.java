package com.gluk.dagaz.parser;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class StateStatement extends AbstractStatement {
	
	private final static String INTERNAL_POS_VALUE = "_pos";

	private String func = null;
	private int failOffset = 0;
	private int exitOffset = 0;
	private ICommand exitCommand =null;
	
	@Override
	public void open(String name) throws CommonException {
		this.func = name;
		ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		build.addCommand(getCommand);
		getCommand.addArgument(IReserved.STATE_POSITION);
		ICommand letCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_LET, build);
		build.addCommand(letCommand);
		letCommand.addArgument(INTERNAL_POS_VALUE);
		int enterOffset = build.getOffset();
		ICommand enterCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_JUMP, build);
		build.addCommand(enterCommand);
		failOffset = build.getOffset();
		getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		build.addCommand(getCommand);
		getCommand.addArgument(IReserved.LOCAL_FALSE);
		exitOffset = build.getOffset();
		exitCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_JUMP, build);
		build.addCommand(exitCommand);
		int currentOffset = build.getOffset();
		enterCommand.addArgument(currentOffset - enterOffset);
	}
	
	@Override
	public void close() throws CommonException {
		ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		build.addCommand(getCommand);
		getCommand.addArgument(func);
		int currentOffset = build.getOffset();
		exitCommand.addArgument(currentOffset - exitOffset);
		getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		build.addCommand(getCommand);
		getCommand.addArgument(INTERNAL_POS_VALUE);
		getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		build.addCommand(getCommand);
		ICommand delCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_DEL, build);
		build.addCommand(delCommand);
		delCommand.addArgument(INTERNAL_POS_VALUE);
	}
	
	@Override
	public void addOperand(String name) throws CommonException {
		ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		build.addCommand(getCommand);
		getCommand.addArgument(name);
		ICommand notCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_NOT, build);
		build.addCommand(notCommand);
		int ifOffset = build.getOffset();
		ICommand ifCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_IF, build);
		build.addCommand(ifCommand);
		ifCommand.addArgument(failOffset - ifOffset);
	}

	@Override
	public void open(IStatementInternal stmt) throws CommonException {
		throw new CommonException("Unsupported");
	}
}
