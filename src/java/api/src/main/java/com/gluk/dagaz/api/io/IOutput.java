package com.gluk.dagaz.api.io;

import com.gluk.dagaz.api.exceptions.CommonException;

public interface IOutput {
	void write(String s) throws CommonException;
	void close() throws CommonException;
}
