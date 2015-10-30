package com.gluk.dagaz.utils;

import com.gluk.dagaz.api.parser.IDataManager;
import com.gluk.dagaz.api.parser.IInput;
import com.gluk.dagaz.exceptions.CommonException;

public class DataManager implements IDataManager {
	
	private static IDataManager instance = null;
	
	public synchronized static IDataManager getInstance() {
		if (instance == null) {
			instance = new DataManager();
		}
		return instance;
	}
	
	private DataManager() {}

	public IInput getInput(String scope, String name) throws CommonException {
		// TODO:
		
		
		throw new CommonException("Not implemented");
	}
}
