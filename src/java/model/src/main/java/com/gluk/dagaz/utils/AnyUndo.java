package com.gluk.dagaz.utils;

import java.util.Stack;

import com.gluk.dagaz.api.model.IValue;

public class AnyUndo {

	private int command;
	private int index = 0;
	private Stack<IValue> stack = new Stack<IValue>(); 
	
	public AnyUndo(int command) {
		this.command = command;
	}
	
	public void saveStack(IValue v) {
		stack.push(v);
	}
	
	public Stack<IValue> getStack() {
		return stack;
	}
	
	public int getCommand() {
		return command;
	}
	
	public int getIndex() {
		return index++;
	}
}
