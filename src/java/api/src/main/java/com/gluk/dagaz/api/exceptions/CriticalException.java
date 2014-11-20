package com.gluk.dagaz.api.exceptions;

public class CriticalException extends CommonException {
	public CriticalException(String message) {
		super(message);
	}
	public CriticalException(String message, Throwable cause) {
		super(message, cause);
	}
}
