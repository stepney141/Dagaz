package com.gluk.dagaz.runtime;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class LogCommand extends AbstractCommand { // --
	
	private List<String> values = new ArrayList<String>();
	
	@Override
	public void addArgument(Object arg) throws CommonException {
		if (!(arg instanceof String)) {
			throw new CommonException("Invalid argument");
		}
		values.add((String)arg);
	}

	@Override
	public boolean execute(IDeferredCheck state, IEnvironment env) throws CommonException {
		super.execute(state, env);
		if (values.isEmpty()) {
			throw new CommonException("Invalid arguments");
		}
		for (String name: values) {
			String value = name;
			if (env.isDefined(name)) {
				name = env.get(name).getString();
			}
			processor.getMoveLogger().log(value);
		}
		return true;
	}

}
