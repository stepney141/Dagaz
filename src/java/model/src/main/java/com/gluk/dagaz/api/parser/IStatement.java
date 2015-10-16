package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.exceptions.CommonException;

public interface IStatement {
	boolean childIsActive();
	void openChild(String name) throws CommonException;
	void closeChild() throws CommonException;
	void addLexem(String name) throws CommonException;
	void open(String name) throws CommonException;
	void close() throws CommonException;
	void setParent(IStatement parent);
	void setDeferred();
}
