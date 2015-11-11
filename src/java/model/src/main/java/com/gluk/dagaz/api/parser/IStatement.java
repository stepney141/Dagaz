package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.exceptions.CommonException;

public interface IStatement {
	void tag(String name) throws CommonException;
	void end() throws CommonException;
	void val(String name) throws CommonException;
	boolean isExpression();
}
