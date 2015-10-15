package com.gluk.dagaz.parser;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;
import com.gluk.dagaz.utils.Value;

public class AnyBuilder extends AbstractBuilder {

	private ICommand anyCommand = null;

	@Override
	public void open(String name) throws CommonException {
		anyCommand = CommandFactory.getInstance().createCommand(IReserved.CMD_ANY, build);
		build.addCommand(anyCommand);
	}
	
	@Override
	public void openChild(String name) throws CommonException {
		throw new CommonException("Unsupported expression in the ANY statement");
	}
	
	@Override
	public void addOperand(String name) throws CommonException {
		anyCommand.addArgument(Value.create(name));
	}
}
