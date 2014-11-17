package com.gluk.dagaz.api.rules;

import com.gluk.dagaz.api.exceptions.BoardException;

public interface IMoveExecutorConfiguration {
	void linkOperaion(String position, String direction, String operation) throws BoardException;
}
