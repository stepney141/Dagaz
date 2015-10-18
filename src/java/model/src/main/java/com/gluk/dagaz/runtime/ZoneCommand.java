package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Value;

public class ZoneCommand extends AbstractCommand { // [s] -- ?
	
	private String zone = null;
	private String pos  = null;

	@Override
	public void addArgument(Object arg) throws CommonException {
		if ((pos != null) || !(arg instanceof String)) {
			throw new CommonException("Invalid argument");
		}
		if (zone == null) {
			zone = (String)arg;
		} else {
			pos = (String)arg;
		}
	}
	
	@Override
	public boolean execute(IDeferredCheck state, IEnvironment env) throws CommonException {
		super.execute(state, env);
		if (zone == null) {
			throw new CommonException("Invalid arguments");
		}
		if (pos == null) {
			pos = processor.getStack().pop().getString();
		}
		processor.getStack().push(Value.create(processor.getBoard().inZone(pos, pos, env)));
		return true;
	}
}
