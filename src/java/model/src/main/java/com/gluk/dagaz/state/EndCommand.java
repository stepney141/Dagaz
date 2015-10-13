package com.gluk.dagaz.state;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.AbstractCommand;
import com.gluk.dagaz.runtime.Processor;

public class EndCommand extends AbstractCommand { // --

	public EndCommand(Processor processor) {
		super(processor);
	}

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		processor.gen.endMove();
		return false; // Важно: ветвление обеспечивать внешним any
	}
}
