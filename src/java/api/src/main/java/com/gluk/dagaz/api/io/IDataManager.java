package com.gluk.dagaz.api.io;

import com.gluk.dagaz.api.exceptions.CommonException;

public interface IDataManager {
	IInput getInput(String scope, String name) throws CommonException;
}
