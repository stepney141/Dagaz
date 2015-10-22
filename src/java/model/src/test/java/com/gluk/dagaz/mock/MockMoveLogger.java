package com.gluk.dagaz.mock;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class MockMoveLogger implements IMoveLogger {
	
	private StringBuffer sb = new StringBuffer();
	private boolean isClosed = false;
	
	public String getLog() {
		return sb.toString();
	}
	
	public boolean isClosed() {
		return isClosed;
	}

	public void endMove(IEnvironment env) throws CommonException {
		if (isClosed) {
			throw new CommonException("Move Logger is closed");
		}
		isClosed = true;
	}

	public void log(String notation) {
		sb.append(notation);
	}

	public void savepoint() {}

	public boolean rollback() throws CommonException {
		return false;
	}

	public void clear() {}
}
