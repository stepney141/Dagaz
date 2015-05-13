package com.gluk.dagaz.api.state;

public interface ISession extends IRepeatitionHelper {
	IState getInitialState();
	IState getCurrentState();
}
