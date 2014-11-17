package com.gluk.dagaz.api.exceptions;

public class InvalidPositionException extends CommonException {
	public InvalidPositionException(String message) {
		super(message);
	}
	public InvalidPositionException(String message, Throwable cause) {
		super(message, cause);
	}
}
