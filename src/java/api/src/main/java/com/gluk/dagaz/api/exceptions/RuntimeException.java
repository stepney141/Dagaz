package com.gluk.dagaz.api.exceptions;

public class RuntimeException extends CommonException {
	public RuntimeException(String message) {
		super(message);
	}
	public RuntimeException(String message, Throwable cause) {
		super(message, cause);
	}
}
