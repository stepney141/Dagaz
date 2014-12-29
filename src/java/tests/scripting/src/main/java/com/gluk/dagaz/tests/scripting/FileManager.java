package com.gluk.dagaz.tests.scripting;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.io.IDataManager;
import com.gluk.dagaz.api.io.IInput;

public class FileManager implements IDataManager {
	
	private static IDataManager instance = null;
	
	private FileManager() {}
	
	public synchronized static IDataManager getInstance() {
		if (instance == null) {
			instance = new FileManager();
		}
		return instance;
	}

	public IInput getInput(String scope, String name) throws CommonException {
		return new FileInput(scope, name);
	}
}
