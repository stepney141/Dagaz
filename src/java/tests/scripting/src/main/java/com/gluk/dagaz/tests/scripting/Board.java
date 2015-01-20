package com.gluk.dagaz.tests.scripting;

import java.util.List;

import com.gluk.dagaz.api.exceptions.BoardException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.rules.board.IBoardConfiguration;

public class Board implements IBoardConfiguration {

	public void createPosition(String position) throws BoardException {}

	public void deletePosition(String position) throws BoardException {}

	public void addLink(String name, String startPosition, String endPosition) throws BoardException {}

	public void addZone(String name, String position, String player) throws BoardException {}

	public void addZone(String name, String position) throws BoardException {}

	public void addSymmetry(String oldDirection, String newDirection, String player) throws BoardException {}

	public void addSynonym(String oldPosition, String newPosition, String player, boolean isGate) throws BoardException {}

	public void addSynonym(String oldPosition, String newPosition, boolean isGate) throws BoardException {}

	public void addOperation(String name, String oldPosition, String newPosition) throws BoardException {}

	public void addOperation(String name, String oldPosition, String newPosition, String player) throws BoardException {}

	public void addCounter(String name, String value, String player) throws BoardException {}

	public void addCounter(String name, String value) throws BoardException {}

	public boolean isDefined(String name) {
		return false;
	}

	@Override
	public List<String> getPositions(String zone, String player) throws EvaluationException {
		throw new EvaluationException("Unimplemented");
	}

	@Override
	public List<String> getPositions() throws EvaluationException {
		throw new EvaluationException("Unimplemented");
	}
}
