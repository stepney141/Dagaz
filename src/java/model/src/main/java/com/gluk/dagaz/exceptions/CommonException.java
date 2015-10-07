package com.gluk.dagaz.exceptions;

public class CommonException extends Exception {
	public CommonException(String message) {
		super(message);
	}
	public CommonException(String message, Throwable cause) {
		super(message, cause);
	}
}
