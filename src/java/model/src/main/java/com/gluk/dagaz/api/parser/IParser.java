package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.exceptions.CommonException;

public interface IParser {
	void parse(String name) throws CommonException;
	void openBracket() throws CommonException;
	void closeBracket() throws CommonException;
	void addAtom(String s) throws CommonException;
	void addLiteral(String s, boolean isNumeric) throws CommonException;
	void closeAll() throws CommonException;
}
