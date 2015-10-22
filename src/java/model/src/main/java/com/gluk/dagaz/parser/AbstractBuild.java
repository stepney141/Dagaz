package com.gluk.dagaz.parser;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.runtime.ICommand;

public abstract class AbstractBuild implements IBuild {

	protected List<ICommand> commands = new ArrayList<ICommand>();
	
	public void addCommand(ICommand command) {
		commands.add(command);
	}

	public int getOffset() {
		return commands.size();
	}
}
