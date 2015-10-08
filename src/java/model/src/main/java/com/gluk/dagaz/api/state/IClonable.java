package com.gluk.dagaz.api.state;

import com.gluk.dagaz.exceptions.CommonException;

public interface IClonable {
	void copyTo(IEnvironment env) throws CommonException;
}
