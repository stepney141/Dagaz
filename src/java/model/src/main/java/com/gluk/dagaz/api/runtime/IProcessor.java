package com.gluk.dagaz.api.runtime;

import java.util.Stack;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.ITransactional;
import com.gluk.dagaz.api.state.IValue;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.AnyUndo;

public interface IProcessor extends ITransactional {
	IBoard         getBoard();
	Stack<IValue>  getStack();
	AnyUndo        getUndo();
	IMoveLogger    getLogger();
	void           pushUndo(AnyUndo u);
	void           incNextCommand(int delta);
	void           execute(IDeferredCheck state, IEnvironment env) throws CommonException;
}
