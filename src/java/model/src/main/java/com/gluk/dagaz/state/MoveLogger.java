package com.gluk.dagaz.state;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import com.gluk.dagaz.api.application.IMoveCallback;
import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.api.state.ITransactional;
import com.gluk.dagaz.exceptions.CommonException;

public class MoveLogger implements IMoveLogger, ITransactional {
	
	private IMoveCallback callback;
	private IState state;
	private List<String> notationList = new ArrayList<String>();
	private Stack<Integer> undo = new Stack<Integer>(); 
	
	public MoveLogger(IState state, IMoveCallback callback) {
		this.callback = callback;
		this.state = state;
	}
	
	public void clear() {
		notationList.clear();
		undo.clear();
	}

	public void log(String notation) {
		notationList.add(notation);
	}

	public void endMove() {
		StringBuffer sb = new StringBuffer();
		for (String s: notationList) {
			sb.append(s);
		}
		callback.addMove(sb.toString(), state);
	}

	public void savepoint() {
		undo.push(notationList.size());
	}

	public void rollback() throws CommonException {
		if (undo.isEmpty()) {
			throw new CommonException("Internal Error");
		}
		int sz = undo.pop();
		while (notationList.size() > sz) {
			notationList.remove(notationList.size() - 1);
		}
	}
}
