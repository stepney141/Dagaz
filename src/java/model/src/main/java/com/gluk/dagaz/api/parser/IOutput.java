package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.exceptions.CommonException;

public interface IOutput {
	void write(String s) throws CommonException;
	void close() throws CommonException;
}
