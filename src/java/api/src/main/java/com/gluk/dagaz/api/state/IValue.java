package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.InvalidValueException;
import com.gluk.dagaz.api.exceptions.ValueException;

public interface IValue {
	String getValue(String name) throws InvalidValueException;
	void setValue(String name, String value) throws ValueException;
}
