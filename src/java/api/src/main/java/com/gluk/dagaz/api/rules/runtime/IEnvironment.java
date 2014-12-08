package com.gluk.dagaz.api.rules.runtime;

public interface IEnvironment {
	IValue getValue(String name) throws RuntimeException;
	void setValue(String name, IValue value) throws RuntimeException;
}
