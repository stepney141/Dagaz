package com.gluk.dagaz.api.application;

import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.exceptions.CommonException;

public interface IMoveGenerator {
	void addMove(String notation, IDeferredCheck state);
	void close() throws CommonException;
}
