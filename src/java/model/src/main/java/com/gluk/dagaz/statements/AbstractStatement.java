package com.gluk.dagaz.statements;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.exceptions.CommonException;

public abstract class AbstractStatement implements IStatementInternal {
	
	protected IBuild build = null;
	private IStatementInternal childStatement = null;
	private IStatementInternal parent = null;
	
	public void setBuild(IBuild build) {
		this.build = build;
	}
	
	public void setParent(IStatementInternal parent) {
		this.parent = parent;
	}
	
	public void setDeferred() {
		if (parent != null) {
			parent.setDeferred();
		}
	}

	public boolean childIsActive() {
		return childStatement != null;
	}
	
	public void openChild(String name) throws CommonException {
		if (childIsActive()) {
			childStatement.openChild(name);
		} else {
			childStatement = StatementFactory.getInstance().createStatement(name, build);
			childStatement.setParent(this);
			childStatement.open(name);
			open(childStatement);
		}
	}

	public void closeChild() throws CommonException {
		if (!childIsActive()) {
			throw new CommonException("The Builder is not active");
		}
		if (childStatement.childIsActive()) {
			childStatement.closeChild();
		} else {
			childStatement.close();
			close(childStatement);
			childStatement = null;
		}
	}

	public void addLexem(String name) throws CommonException {
		if (IReserved.STMT_END.equals(name)) {
			IStatementInternal stmt = StatementFactory.getInstance().createStatement(name, build);
			stmt.open(name);
			open(stmt);
			close(stmt);
			stmt.close();
			return;
		}
		if (childIsActive()) {
			childStatement.addLexem(name);
		} else {
			addOperand(name);
		}
	}
	
	public boolean isExpression() {
		return false;
	}
	
	public void addOperand(String name) throws CommonException {}
	public void open(String name) throws CommonException {}
	public void close() throws CommonException {}
	public void open(IStatementInternal stmt) throws CommonException {}
	public void close(IStatementInternal stmt) throws CommonException {}
}
