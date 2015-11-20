package com.gluk.dagaz.api.runtime;

import java.util.Stack;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.ITransactional;
import com.gluk.dagaz.api.state.IValue;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.state.State;
import com.gluk.dagaz.utils.AnyUndo;

public interface IProcessor extends ITransactional {
	Stack<IValue>  getStack();
	AnyUndo        getUndo();
	IMoveLogger    getLogger();
	void           pushUndo(AnyUndo u);
	void           incNextCommand(int delta);
	void           addBuild(IBuild build);
	void           execute(State state, IEnvironment env) throws CommonException;
}
