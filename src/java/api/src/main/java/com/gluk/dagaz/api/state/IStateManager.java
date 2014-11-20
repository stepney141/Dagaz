package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.StateException;

public interface IStateManager {
	void configure(String name, String value);
	ISession createSession() throws StateException;
}
