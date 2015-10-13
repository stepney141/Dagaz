package com.gluk.dagaz.runtime;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;

public class AnyCommand extends AbstractCommand { // -- v
	
	private List<IValue> values = new ArrayList<IValue>(); 

	public AnyCommand(List<IValue> values, Processor processor) {
		super(processor);
		this.values = values;
	}

	@Override
	public boolean execute(IState state, IEnvironment env) throws CommonException {
		int ix = processor.undo.peek().getIndex();
		if (ix >= values.size()) {
			processor.undo.pop();
			return false;
		}
		processor.stack.push(values.get(ix));
		return true;
	}
}
