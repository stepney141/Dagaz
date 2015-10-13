package com.gluk.dagaz.utils;

public class AnyUndo {

	private int command;
	private int index = 0;
	
	public AnyUndo(int command) {
		this.command = command;
	}
	
	public int getCommand() {
		return command;
	}
	
	public int getIndex() {
		return index++;
	}
}
