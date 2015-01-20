package com.gluk.dagaz.api.rules.board;

import java.util.List;

import com.gluk.dagaz.api.exceptions.BoardException;
import com.gluk.dagaz.api.exceptions.EvaluationException;

public interface IBoardConfiguration {
	void createPosition(String position) throws BoardException;
	void deletePosition(String position) throws BoardException;
	void addLink(String name, String startPosition, String endPosition) throws BoardException;
	void addZone(String name, String position, String player) throws BoardException;
	void addZone(String name, String position) throws BoardException;
	void addSymmetry(String oldDirection, String newDirection, String player) throws BoardException;
	void addSynonym(String oldPosition, String newPosition, String player, boolean isGate) throws BoardException;
	void addSynonym(String oldPosition, String newPosition, boolean isGate) throws BoardException;
	void addOperation(String name, String oldPosition, String newPosition) throws BoardException;
	void addOperation(String name, String oldPosition, String newPosition, String player) throws BoardException;
	void addCounter(String name, String value, String player) throws BoardException;
	void addCounter(String name, String value) throws BoardException;
	boolean isDefined(String name);
	List<String> getPositions(String zone, String player) throws EvaluationException; // Use current-player variable
	List<String> getPositions() throws EvaluationException;
}
