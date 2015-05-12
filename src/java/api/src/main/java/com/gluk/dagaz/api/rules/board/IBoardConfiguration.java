package com.gluk.dagaz.api.rules.board;

import com.gluk.dagaz.api.exceptions.BoardException;

public interface IBoardConfiguration {
	void addPosition(String position) throws BoardException;
	void delPosition(String position) throws BoardException;
	void addLink(String name, String startPosition, String endPosition) throws BoardException;
	void addZone(String name, String position, String player) throws BoardException;
	void addZone(String name, String position) throws BoardException;
	void addSymmetry(String oldDirection, String newDirection, String player) throws BoardException;
	void addSynonym(String oldPosition, String newPosition, String player, boolean isGate) throws BoardException;
	void addSynonym(String oldPosition, String newPosition, boolean isGate) throws BoardException;
	void addVariable(String name, String value, String player) throws BoardException;
	void addVariable(String name, String value) throws BoardException;
}
