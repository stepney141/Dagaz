package com.gluk.dagaz.statements;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class LogStatement extends AbstractStatement {
	
	private List<String> names = new ArrayList<String>();

	@Override
	public void addOperand(String name) throws CommonException {
		names.add(name);
	}

	@Override
	public void close() throws CommonException {
		if (names.isEmpty()) {
			throw new CommonException("Syntax error");
		}
		ICommand logCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_LOG, build);
		for (String s: names) {
			logCommand.addArgument(s);
		}
	}
	
	@Override
	public void open(IStatementInternal stmt) throws CommonException {
		throw new CommonException("Unsupported");
	}
}
