package com.gluk.dagaz.api.moves;

import com.gluk.dagaz.api.exceptions.CommonException;

public interface IMoveAssembler {
	void pushMove(String move, String mode);
	void popMove() throws CommonException;
	void addCondition(ICondition condition) throws CommonException;
	void completeMove();
}
