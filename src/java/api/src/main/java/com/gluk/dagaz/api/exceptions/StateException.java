package com.gluk.dagaz.api.exceptions;

public class StateException extends CommonException {
	public StateException(String message) {
		super(message);
	}
	public StateException(String message, Throwable cause) {
		super(message, cause);
	}
}
