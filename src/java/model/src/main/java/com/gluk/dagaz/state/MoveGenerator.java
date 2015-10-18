package com.gluk.dagaz.state;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.application.IMoveCallback;
import com.gluk.dagaz.api.application.IMoveGenerator;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class MoveGenerator implements IMoveGenerator {
	
	private IMoveCallback callback;
	private LocalEnvironment local;
	private Map<String, IDeferredCheck> moves = new HashMap<String, IDeferredCheck>(); 
	
	public MoveGenerator(IMoveCallback callback, LocalEnvironment local) {
		this.callback  = callback;
		this.local = local; 
	}

	public synchronized void addMove(String notation, State state, IEnvironment env) throws CommonException {
		try {
			IDeferredCheck clone = (IDeferredCheck)state.clone();
			for (ICommand c: state.getDeferredCommands()) {
				String name = c.getValueName();
				if ((name != null) && local.isKnown(name)) {
					clone.setValue(name, local.get(name));
				}
			}
			moves.put(notation, clone);
		} catch (CloneNotSupportedException e) {
			throw new CommonException(e.toString(), e);
		}
	}

	public void close() throws CommonException {
		for (String name: moves.keySet()) {
			IDeferredCheck state = moves.get(name);
			if (state.check()) {
				callback.addMove(name, state);
			}
		}
		moves.clear();
	}
}
