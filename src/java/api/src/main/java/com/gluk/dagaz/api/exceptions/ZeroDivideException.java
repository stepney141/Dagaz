package com.gluk.dagaz.api.exceptions;

public class ZeroDivideException extends EvaluationException {
	public ZeroDivideException(String message) {
		super(message);
	}
	public ZeroDivideException(String message, Throwable cause) {
		super(message, cause);
	}
}
