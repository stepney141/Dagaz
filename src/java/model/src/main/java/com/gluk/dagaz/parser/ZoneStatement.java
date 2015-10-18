package com.gluk.dagaz.parser;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;

public class ZoneStatement extends AbstractStatement {  

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
			build.addCommand(getCommand);
			getCommand.addArgument(IReserved.STATE_POSITION);
		}
		ICommand zoneCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_ZONE, build);
		build.addCommand(zoneCommand);
		zoneCommand.addArgument(zone);
		if (pos != null) {
			zoneCommand.addArgument(pos);
		}
		if (func.equals(IReserved.STMT_NOT_ZONE)) {
			ICommand notCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_NOT, build);
			build.addCommand(notCommand);
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
	public void openChild(String name) throws CommonException {
		throw new CommonException("Unsupported");
	}
}
