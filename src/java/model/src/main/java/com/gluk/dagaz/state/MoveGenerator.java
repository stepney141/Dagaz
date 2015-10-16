package com.gluk.dagaz.state;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.application.IMoveCallback;
import com.gluk.dagaz.api.application.IMoveGenerator;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.exceptions.CommonException;

public class MoveGenerator implements IMoveGenerator {
	
	private IMoveCallback callback;
	private Map<String, IDeferredCheck> moves = new HashMap<String, IDeferredCheck>(); 
	
	public MoveGenerator(IMoveCallback callback) {
		this.callback = callback;
	}

	public synchronized void addMove(String notation, IDeferredCheck state) {
		moves.put(notation, state);
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
