package com.gluk.dagaz.tests.scripting;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.io.IDataManager;
import com.gluk.dagaz.api.random.IRandomFactory;
import com.gluk.dagaz.api.rules.runtime.IFunctionList;
import com.gluk.dagaz.api.state.IStateManager;
import com.gluk.dagaz.rules.runtime.utils.FunctionList;

public class BaseApplication implements IApplication {
	
	private FunctionList functionList = new FunctionList(); 

	public IFunctionList getFunctionList() {
		return functionList;
	}

	public IDataManager getDataManager() {
		return FileManager.getInstance();
	}

	public IStateManager getStateManager() {
		return null;
	}

	public IRandomFactory getRandomFactory() {
		return null;
	}

}
