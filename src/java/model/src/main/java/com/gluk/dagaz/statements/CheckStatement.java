package com.gluk.dagaz.statements;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class CheckStatement extends AbstractStatement {

	private int baseOffset = 0;
	private ICommand checkCommand = null;
	private boolean isDeferred = false;
	
	public void open(String name) throws CommonException {
		baseOffset = build.getOffset();
	}

	private void addCheckCommand() throws CommonException {
		checkCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_CHECK, build);
	}
	
	@Override
	public void addOperand(String name) throws CommonException {
		if (checkCommand != null) {
			throw new CommonException("Invalid CHECK arity");
		}
		ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		getCommand.addArgument(name);
		addCheckCommand();
	}
	
	@Override
	public void close(IStatementInternal stmt) throws CommonException {
		if (checkCommand != null) {
			throw new CommonException("Invalid CHECK arity");
		}
		addCheckCommand();
	}

	@Override
	public void setDeferred() {
		isDeferred = true;
	}
	
	@Override
	public void close() throws CommonException {
		if (isDeferred) {
			build.setDeferred(baseOffset);
		}
	}
}
