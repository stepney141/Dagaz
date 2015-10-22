package com.gluk.dagaz.mock;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.AbstractProcessor;

public class MockProcessor extends AbstractProcessor {
	
	public MockProcessor(IBoard board, IMoveLogger logger) {
		super(board, logger);
	}
	
	public void addFixup(int offset) {}

	public void fixup() throws CommonException {}

	public void addLocalName(String name) {}

	public boolean isLocalName(String name) {
		return true;
	}

	public void setDeferred(int offset) {}

	public void savepoint() {}

	public boolean rollback() throws CommonException {
		return false;
	}
}
