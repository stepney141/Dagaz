package com.gluk.dagaz.api.parser;

import java.io.Reader;

import com.gluk.dagaz.exceptions.CommonException;

public interface IInput {
	String getScope();
	void read(IOutput out) throws CommonException;
	Reader getReader() throws CommonException;
}
