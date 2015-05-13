package com.gluk.dagaz.api.application;

import com.gluk.dagaz.api.io.IDataManager;
import com.gluk.dagaz.api.random.IRandomFactory;
import com.gluk.dagaz.api.rules.functions.IFunctionManager;
import com.gluk.dagaz.api.state.ISession;

public interface IApplication {
	IFunctionManager  getFunctionManager();
	IDataManager      getDataManager();
	ISession     getStateManager();
	IRandomFactory    getRandomFactory();
}
