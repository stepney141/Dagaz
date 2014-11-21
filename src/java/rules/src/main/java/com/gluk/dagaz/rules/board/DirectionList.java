package com.gluk.dagaz.rules.board;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.exceptions.BoardException;

public class DirectionList {
	
	private Map<String, String> directions = new HashMap<String, String>();
	
	public void addDirection(String direction, String position) throws BoardException {
		if (directions.containsKey(direction)) {
			throw new BoardException("Duplicate direction [" + direction + "]");
		}
		directions.put(direction, position);
	}
	
	public String getPosition(String direction) throws BoardException {
		String r = directions.get(direction);
		return r;
	}
}
