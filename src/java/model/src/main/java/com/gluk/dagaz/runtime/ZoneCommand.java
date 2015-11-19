package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class ZoneCommand extends AbstractCommand { // [s] -- ?
	
	private String zone = null;
	private String name = null;

	public ZoneCommand() {
		super(IReserved.CMD_ZONE);
	}

	@Override
	public void addArgument(Object arg) throws CommonException {
		if ((name != null) || !(arg instanceof String)) {
			throw new CommonException("Invalid argument");
		}
		if (zone == null) {
			zone = (String)arg;
		} else {
			name = (String)arg;
		}
		super.addArgument(arg);
	}
	
	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException {
		if (zone == null) {
			throw new CommonException("Invalid arguments");
		}
		String pos = name;
		if (pos == null) {
			pos = processor.getStack().pop().getString();
		}
		processor.getStack().push(Value.create(processor.getBoard().inZone(zone, pos, env)));
		return true;
	}
}
