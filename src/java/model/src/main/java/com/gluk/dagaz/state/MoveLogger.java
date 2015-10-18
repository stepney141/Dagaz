package com.gluk.dagaz.state;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import com.gluk.dagaz.api.application.IMoveGenerator;
import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.ITransactional;
import com.gluk.dagaz.exceptions.CommonException;

public class MoveLogger implements IMoveLogger, ITransactional {
	
	private IMoveGenerator moveGenerator;
	private State state;
	private List<String> notationList = new ArrayList<String>();
	private Stack<Integer> undo = new Stack<Integer>(); 
	
	public MoveLogger(State state, IMoveGenerator moveGenerator) {
		this.moveGenerator = moveGenerator;
		this.state = state;
	}
	
	public void clear() {
		notationList.clear();
		undo.clear();
	}

	public void log(String notation) {
		notationList.add(notation);
	}

	public void endMove(IEnvironment env) throws CommonException {
		StringBuffer sb = new StringBuffer();
		for (String s: notationList) {
			sb.append(s);
		}
		moveGenerator.addMove(sb.toString(), state, env);
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
