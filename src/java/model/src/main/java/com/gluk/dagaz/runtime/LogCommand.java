package com.gluk.dagaz.runtime;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.runtime.IProcessor;
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

	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException {
		if (values.isEmpty()) {
			throw new CommonException("Invalid arguments");
		}
		for (String value: values) {
			if (env.isDefined(value)) {
				value = env.get(value).getString();
			}
			processor.getLogger().log(value);
		}
		return true;
	}
}
