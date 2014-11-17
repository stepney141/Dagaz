package com.gluk.dagaz.api.exceptions;

public class BoardException extends CommonException {
	public BoardException(String message) {
		super(message);
	}
	public BoardException(String message, Throwable cause) {
		super(message, cause);
	}
}
