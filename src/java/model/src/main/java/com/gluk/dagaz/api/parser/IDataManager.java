package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.exceptions.CommonException;

public interface IDataManager {
	IInput getInput(String scope, String name) throws CommonException;
}
