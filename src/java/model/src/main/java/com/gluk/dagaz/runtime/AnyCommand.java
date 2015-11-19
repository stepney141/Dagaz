package com.gluk.dagaz.runtime;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IValue;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.AnyUndo;

public class AnyCommand extends AbstractCommand { // -- v
	
	private List<IValue> values = new ArrayList<IValue>(); 

	public AnyCommand() {
		super(IReserved.CMD_ANY);
	}

	@Override
	public void addArgument(Object arg) throws CommonException {
		if (!(arg instanceof IValue)) {
			throw new CommonException("Invalid argument");
		}
		values.add((IValue)arg);
		super.addArgument(arg);
	}
	
	public boolean execute(IProcessor processor, IDeferredCheck state, IEnvironment env) throws CommonException {
		AnyUndo u = processor.getUndo();
		int ix = u.getIndex();
		if (ix >= values.size()) {
			return false;
		}
		processor.pushUndo(u);
		processor.savepoint();
		processor.getStack().push(values.get(ix));
		return true;
	}
}
