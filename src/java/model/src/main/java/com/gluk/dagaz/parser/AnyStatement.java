package com.gluk.dagaz.parser;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;
import com.gluk.dagaz.utils.Value;

public class AnyStatement extends AbstractStatement {

	private ICommand anyCommand = null;
	private boolean isQuoted = false;

	@Override
	public void open(String name) throws CommonException {
		anyCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_ANY, build);
		build.addCommand(anyCommand);
	}
	
	@Override
	public void open(IStatementInternal stmt) throws CommonException {
		throw new CommonException("Unsupported expression in the ANY statement");
	}
	
	@Override
	public void addOperand(String name) throws CommonException {
		if (isQuoted) {
			anyCommand.addArgument(Value.quote(name));
		} else {
			anyCommand.addArgument(Value.create(name));
		}
	}

	@Override
	public void setQuoted() {
		isQuoted = true;
	}
}
