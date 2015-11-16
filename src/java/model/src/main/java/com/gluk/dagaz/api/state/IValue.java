package com.gluk.dagaz.api.state;

import com.gluk.dagaz.exceptions.CommonException;

public interface IValue {
	String getString();
	int getNumber() throws CommonException;
	boolean getBoolean() throws CommonException;
	boolean isReference();
}
