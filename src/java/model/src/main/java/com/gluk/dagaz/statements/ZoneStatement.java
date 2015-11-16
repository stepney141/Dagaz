package com.gluk.dagaz.statements;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class ZoneStatement extends AbstractExpression {  

	private String func = null;
	private String zone = null;
	private String pos  = null;

	@Override
	public void open(String name) throws CommonException {
		this.func = name;
	}
	
	public void close() throws CommonException {
		if (zone == null) {
			throw new CommonException("Syntax error");
		}
		if (pos == null) {
			ICommand getCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
			getCommand.addArgument(IReserved.STATE_POSITION);
		}
		ICommand zoneCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_ZONE, build);
		zoneCommand.addArgument(zone);
		if (pos != null) {
			zoneCommand.addArgument(pos);
		}
		if (func.equals(IReserved.STMT_NOT_ZONE)) {
			CommandFactory.getInstance().createCommand(IReserved.CMD_NOT, build);
		}
	}
	
	@Override
	public void addOperand(String name) throws CommonException {
		if (zone == null) {
			zone = name;
			return;
		}
		if (pos == null) {
			pos = name;
			return;
		}
		throw new CommonException("Syntax error");
	}

	@Override
	public void open(IStatementInternal stmt) throws CommonException {
		throw new CommonException("Unsupported");
	}
}
