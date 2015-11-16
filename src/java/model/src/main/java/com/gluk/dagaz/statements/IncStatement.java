package com.gluk.dagaz.statements;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class IncStatement extends AbstractExpression {
	
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
		ICommand incCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_INC, build);
		incCommand.addArgument(name);
	}
	
	@Override
	public void open(IStatementInternal stmt) throws CommonException {
		throw new CommonException("Unsupported");
	}
}
