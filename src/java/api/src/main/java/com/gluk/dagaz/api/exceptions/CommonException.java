package com.gluk.dagaz.api.exceptions;

public class CommonException extends Exception {
	public CommonException(String message) {
		super(message);
	}
	public CommonException(String message, Throwable cause) {
		super(message, cause);
	}
}
