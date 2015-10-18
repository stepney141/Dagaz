package com.gluk.dagaz.runtime;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class TraceCommand extends AbstractCommand { // --

    private static final Logger LOGGER = Logger.getLogger(TraceCommand.class);
    
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
		StringBuffer sb = new StringBuffer();
		sb.append("trace: ");
		for (String value: values) {
			if (env.isDefined(value)) {
				value = env.get(value).getString();
			}
			sb.append(value);
			sb.append(" ");
		}
		LOGGER.info(sb.toString());
		return true;
	}
}
