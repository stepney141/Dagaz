package com.gluk.dagaz.api.exceptions;

public class ValueNotFoundException extends EvaluationException {
	public ValueNotFoundException(String message) {
		super(message);
	}
	public ValueNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}
}
