package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.application.IConfigurable;

public interface IStateManager extends IConfigurable {
	IState getInitialState();
	IState getCurrentState();
}
