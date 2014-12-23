package com.gluk.dagaz.api.rules.runtime;

import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ValueNotFoundException;

public interface IEnvironment {
	
	public final static int LOSS_SCORE      = 0;
	public final static int WIN_SCORE       = 1;
	public final static int DRAW_SCORE      = 2;
	
	public final static int WEIGHT_AI_HINT  = 1;
	public final static int COMMENT_AI_HINT = 2;
	
	IValue getValue(String name) throws ValueNotFoundException;
	void   letValue(String name, IValue value) throws EvaluationException;
	void   setValue(String name, IValue value) throws EvaluationException;
	void   openFrame();
	void   closeFrame() throws EvaluationException;
	void   setScore(int score, long priority);
	void   commentMove(String s);
	void   addAiHint(int hint, IValue value);
}
