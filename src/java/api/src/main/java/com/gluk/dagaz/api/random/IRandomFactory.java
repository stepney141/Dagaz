package com.gluk.dagaz.api.random;

public interface IRandomFactory {
	IRandomGenerator getGenerator(String name, long seed);
	IRandomGenerator getGenerator(String name);
}
