package com.gluk.dagaz.api.piece;

public interface IAction {
	int    getType();
	String getName();
	void   addParameter(String value);
}
