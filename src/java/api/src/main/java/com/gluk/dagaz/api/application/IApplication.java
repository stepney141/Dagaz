package com.gluk.dagaz.api.application;

import com.gluk.dagaz.api.io.IDataManager;
import com.gluk.dagaz.api.random.IRandomFactory;
import com.gluk.dagaz.api.state.IStateManager;

public interface IApplication {
	IDataManager getDataManager();
	IStateManager getStateManager();
	IRandomFactory getRandomFactory();
}
