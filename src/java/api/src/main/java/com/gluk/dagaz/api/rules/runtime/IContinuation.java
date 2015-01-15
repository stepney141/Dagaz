package com.gluk.dagaz.api.rules.runtime;

public interface IContinuation {
	IEnvironment getEnvironment();
	int          popTrace();
	IValue       popValue();
	int          getLevel();
}
