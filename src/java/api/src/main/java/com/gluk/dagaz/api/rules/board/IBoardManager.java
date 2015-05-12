package com.gluk.dagaz.api.rules.board;

import java.util.List;

import com.gluk.dagaz.api.exceptions.BoardException;
import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.state.IState;

public interface IBoardManager extends IBoardConfiguration {
	boolean isDefined(String name);
	List<String> getPositions(String zone, String player) throws EvaluationException; // Use current-player variable
	List<String> getPositions() throws EvaluationException;
	boolean inZone(String position, String name, String player) throws BoardException;
	long addToHash(long hash, String position, IState state) throws CommonException;
	String changePosition(String position, String direction, String player) throws BoardException;
}
