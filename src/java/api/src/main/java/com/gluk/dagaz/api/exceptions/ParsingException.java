package com.gluk.dagaz.api.exceptions;

public class ParsingException extends CommonException {
	public ParsingException(String message) {
		super(message);
	}
	public ParsingException(String message, Throwable cause) {
		super(message, cause);
	}
}
