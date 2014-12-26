package com.gluk.dagaz.tests.converter;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.io.IDataManager;
import com.gluk.dagaz.api.random.IRandomFactory;
import com.gluk.dagaz.api.rules.runtime.IFunctionList;
import com.gluk.dagaz.api.state.IStateManager;

public abstract class BaseApplication implements IApplication {

	public IFunctionList getFunctionList() {
		return null;
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
