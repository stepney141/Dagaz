package com.gluk.dagaz.api.random;

import com.gluk.dagaz.exceptions.CommonException;

public interface IRandomGenerator {
	long getLongValue();
	int getValue(int minValue, int maxValue) throws CommonException;
}
