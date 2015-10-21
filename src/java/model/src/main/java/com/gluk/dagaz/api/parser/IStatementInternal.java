package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.exceptions.CommonException;

public interface IStatementInternal extends IStatement {
	boolean childIsActive();
	void open(String name) throws CommonException;
	void close() throws CommonException;
	void open(IStatementInternal stmt) throws CommonException;
	void close(IStatementInternal stmt) throws CommonException;
	void setParent(IStatementInternal parent);
	void setDeferred();
	void setQuoted();
}
