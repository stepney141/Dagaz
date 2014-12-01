package com.gluk.dagaz.api.io;

import com.gluk.dagaz.api.exceptions.CommonException;

public interface IInput {
	String getScope();
	void read(IOutput out) throws CommonException;
}
