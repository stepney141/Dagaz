package com.gluk.dagaz.statements;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;
import com.gluk.dagaz.runtime.Value;

public class EndStatement extends AbstractStatement {

	@Override
	public void open(String name) throws CommonException {
		ICommand anyCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_ANY, build);
		anyCommand.addArgument(Value.create(true));
		anyCommand.addArgument(Value.create(false));
		int currentOffset = build.getOffset();
		build.addFixup(currentOffset);
		CommandFactory.getInstance().createCommand(IReserved.CMD_IF, build);
	}
	
	@Override
	public void addOperand(String name) throws CommonException {
		throw new CommonException("Unsupported");
	}
}
