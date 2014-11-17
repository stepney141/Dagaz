package com.gluk.dagaz.api.exceptions;

public class TurnOrderException extends CommonException {
	public TurnOrderException(String message) {
		super(message);
	}
	public TurnOrderException(String message, Throwable cause) {
		super(message, cause);
	}
}
