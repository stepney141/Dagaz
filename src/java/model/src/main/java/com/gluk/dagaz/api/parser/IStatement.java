package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.exceptions.CommonException;

public interface IStatement {
	void openChild(String name) throws CommonException;
	void closeChild() throws CommonException;
	void addLexem(String name) throws CommonException;
}
