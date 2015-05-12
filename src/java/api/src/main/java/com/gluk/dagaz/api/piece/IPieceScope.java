package com.gluk.dagaz.api.piece;

import com.gluk.dagaz.api.exceptions.CommonException;

public interface IPieceScope {
	void        setName(String name) throws CommonException;
	void        setAttribute(String name, String value) throws CommonException;
	void        setMode(String name);
	IAction     addAction(String name, int type);
	IPieceScope addScope();
}
