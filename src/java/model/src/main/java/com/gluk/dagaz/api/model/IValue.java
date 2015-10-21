package com.gluk.dagaz.api.model;

import com.gluk.dagaz.exceptions.CommonException;

public interface IValue {
	String getString();
	int getNumber() throws CommonException;
	boolean getBoolean() throws CommonException;
	boolean isReference();
}
