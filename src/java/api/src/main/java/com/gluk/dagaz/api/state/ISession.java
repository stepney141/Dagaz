package com.gluk.dagaz.api.state;

public interface ISession extends IStateNavigation {
	IState getInitialState();
	IState getCurrentState();
}
