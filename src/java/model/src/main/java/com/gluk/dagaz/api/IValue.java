package com.gluk.dagaz.api;

import java.util.List;

import com.gluk.dagaz.exceptions.CommonException;

public interface IValue {
	boolean isList();
	boolean isString();
	boolean isNumber();
	boolean isBoolean();
	List<IValue> getList() throws CommonException;
	String getString() throws CommonException;
	int getNumber() throws CommonException;
	boolean getBoolean() throws CommonException;
}
