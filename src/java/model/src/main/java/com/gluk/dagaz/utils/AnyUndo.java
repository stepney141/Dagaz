package com.gluk.dagaz.utils;

import java.util.Stack;

import com.gluk.dagaz.api.state.IValue;

public class AnyUndo {

	private int next;
	private int curr;
	private int index = 0;
	private Stack<IValue> stack = new Stack<IValue>(); 
	
	public AnyUndo(int next, int curr) {
		this.next = next;
		this.curr = curr;
	}
	
	public void saveStack(IValue v) {
		stack.push(v);
	}
	
	public Stack<IValue> getStack() {
		return stack;
	}
	
	public int getNext() {
		return next;
	}
	
	public int getCurr() {
		return curr;
	}
	
	public int getIndex() {
		return index++;
	}
}
