package com.gluk.dagaz.api.rules.runtime;

import java.util.List;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;

public interface IEnvironment {
	
	public final static int LOSS_SCORE      = 0;
	public final static int WIN_SCORE       = 1;
	public final static int DRAW_SCORE      = 2;
	
	IValue       getValue(String name, boolean isQuoted) throws ValueNotFoundException;
	void         letValue(String name, IValue value) throws EvaluationException;
	void         setValue(String name, IValue value) throws EvaluationException;
	void         openFrame() throws EvaluationException;
	void         closeFrame() throws EvaluationException;
	void         setScore(int score, long priority);
	IEnvironment getCopy();
	boolean      isContinuationsSupported();
	List<String> getPositions(String zone) throws EvaluationException;
	List<String> getPositions() throws EvaluationException;
}
