package com.gluk.dagaz.api.exceptions;

public class EmptyPositionException extends CommonException {
	public EmptyPositionException(String message) {
		super(message);
	}
	public EmptyPositionException(String message, Throwable cause) {
		super(message, cause);
	}
}
