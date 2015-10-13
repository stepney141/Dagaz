package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.ICodeFixup;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;

public class JumpCommand extends AbstractCommand implements ICodeFixup { // --
	
	private int offset = 0;

	public JumpCommand(Processor processor) {
		super(processor);
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		processor.nextCommand += offset - 1;
		return true;
	}
}
