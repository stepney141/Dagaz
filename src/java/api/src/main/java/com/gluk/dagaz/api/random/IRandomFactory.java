package com.gluk.dagaz.api.random;

public interface IRandomFactory {
	IRandomGenerator createGenerator(String name, long seed);
	IRandomGenerator createGenerator(String name);
}
