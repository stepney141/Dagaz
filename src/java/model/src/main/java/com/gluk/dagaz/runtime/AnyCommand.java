package com.gluk.dagaz.runtime;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.AnyUndo;

public class AnyCommand extends AbstractCommand { // -- v
	
	private List<IValue> values = new ArrayList<IValue>(); 

	@Override
	public void addArgument(Object arg) throws CommonException {
		if (!(arg instanceof IValue)) {
			throw new CommonException("Invalid argument");
		}
		values.add((IValue)arg);
	}
	
	@Override
	public boolean execute(IDeferredCheck state, IEnvironment env) throws CommonException {
		super.execute(state, env);
		if (processor.getUndo().isEmpty()) {
			return false;
		}
		AnyUndo u = (AnyUndo)processor.getUndo().peek();
		int ix = u.getIndex();
		if (ix >= values.size()) {
			processor.getUndo().pop();
			return false;
		}
		processor.getStack().push(values.get(ix));
		return true;
	}
}
