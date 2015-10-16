package com.gluk.dagaz.parser;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class DecStatement  extends AbstractStatement {

	private String name = null;

	@Override
	public void addOperand(String name) throws CommonException {
		if (this.name != null) {
			throw new CommonException("Syntax error");
		}
		this.name = name;
	}

	@Override
	public void close() throws CommonException {
		if (this.name == null) {
			throw new CommonException("Syntax error");
		}
		ICommand decCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_DEC, build);
		build.addCommand(decCommand);
		decCommand.addArgument(name);
	}
	
	@Override
	public void openChild(String name) throws CommonException {
		throw new CommonException("Unsupported");
	}
}
