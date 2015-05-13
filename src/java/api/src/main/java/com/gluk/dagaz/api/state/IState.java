package com.gluk.dagaz.api.state;

import java.util.Collection;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.EmptyPositionException;
import com.gluk.dagaz.api.rules.board.IBoardManager;

public interface IState extends IValueSet, IStateNavigation {
	IBoardManager      getBoardManager();
	int                getTurnNumber();
	int                getTurnOrder();
	int                getPartNumber();
	boolean            isPositionExists(String name);
	IPosition          getPosition(String name);
	void               setAttribute(String pos, String name, String value) throws EmptyPositionException;
	void               takePiece(String name, String pos, boolean isCut) throws CommonException;
	void               dropPieces(String name) throws CommonException;
	Collection<String> getPositions();
	boolean            isEqual(IState s);
	boolean            isRepeated(int count, boolean isStarted, int deep, int turnOrder, int prevOrder, int prevNumber, String name, Long hash);
	boolean            isRepeated(int count, int deep, int turnOrder, int prevOrder, int prevNumber, long hash, IState state) throws CommonException;
	boolean            isRepeated(int count, int deep, int turnOrder) throws CommonException;
}
