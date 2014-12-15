package com.gluk.dagaz.api.exceptions;

public class CheckException extends EvaluationException {
	public CheckException(String message) {
		super(message);
	}
	public CheckException(String message, Throwable cause) {
		super(message, cause);
	}
}
