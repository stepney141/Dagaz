package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.application.IConfigurable;
import com.gluk.dagaz.api.exceptions.StateException;

public interface IStateManager extends IConfigurable {
	ISession createSession() throws StateException;
}
