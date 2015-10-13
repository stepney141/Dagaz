package com.gluk.dagaz.api.application;

import com.gluk.dagaz.api.parser.IDataManager;
import com.gluk.dagaz.api.random.IRandomFactory;

public interface IApplication {
	IDataManager      getDataManager();
	IRandomFactory    getRandomFactory();
}
