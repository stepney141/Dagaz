package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.exceptions.CommonException;

public interface IStatementFactory {
	IStatementInternal createStatement(String name, IBuild build) throws CommonException;
}
