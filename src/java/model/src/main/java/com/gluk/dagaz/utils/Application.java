package com.gluk.dagaz.utils;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.parser.IDataManager;
import com.gluk.dagaz.api.random.IRandomFactory;

public class Application implements IApplication {
	
	private static IApplication instance = null;
	
	public static IApplication getInstance() {
		if (instance == null) {
			instance = new Application();
		}
		return instance;
	}
	
	private Application() {}

	public IDataManager getDataManager() {
		// TODO Auto-generated method stub
		return null;
	}

	public IRandomFactory getRandomFactory() {
		// TODO Auto-generated method stub
		return null;
	}

}
