package com.gluk.dagaz.api.random;

public interface IRandomGenerator {
	long getLongValue();
	int getValue(int minValue, int maxValue);
	IRandomGenerator getClone();
}
