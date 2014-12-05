package com.gluk.dagaz.api.rules.runtime;

public interface IValue {
	boolean isList();
	boolean isBoolean();
	boolean isNumber();
	String getString() throws RuntimeException;
	boolean getBoolean() throws RuntimeException;
	long getNumber() throws RuntimeException;
}
