package com.gluk.dagaz.api.rules.parser;

import com.gluk.dagaz.api.exceptions.ParsingException;

public interface IScaner {
	void scan(String s) throws ParsingException;
	void close() throws ParsingException;
}
