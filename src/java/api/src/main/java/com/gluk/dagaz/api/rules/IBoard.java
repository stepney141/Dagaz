package com.gluk.dagaz.api.rules;

import com.gluk.dagaz.api.exceptions.BoardException;

public interface IBoard {
	String changePosition(String position, String direction, String player) throws BoardException;
	boolean inZone(String position, String player) throws BoardException;
}
