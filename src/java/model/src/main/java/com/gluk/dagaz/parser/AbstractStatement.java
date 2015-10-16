package com.gluk.dagaz.parser;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.parser.IStatement;
import com.gluk.dagaz.exceptions.CommonException;

public abstract class AbstractStatement implements IStatement {
	
	protected IBuild build = null;
	private IStatement childBuilder = null;
	private IStatement parent = null;
	
	public void setBuild(IBuild build) {
		this.build = build;
	}
	
	public void setParent(IStatement parent) {
		this.parent = parent;
	}
	
	public void setDeferred() {
		if (parent != null) {
			parent.setDeferred();
		}
	}

	public boolean childIsActive() {
		return childBuilder != null;
	}
	
	public void openChild(String name) throws CommonException {
		if (childIsActive()) {
			childBuilder.openChild(name);
		} else {
			childBuilder = StatementFactory.getInstance().createStatement(name, build);
			childBuilder.setParent(this);
			childBuilder.open(name);
		}
	}

	public void closeChild() throws CommonException {
		if (!childIsActive()) {
			throw new CommonException("The Builder is not active");
		}
		if (childBuilder.childIsActive()) {
			childBuilder.closeChild();
		} else {
			childBuilder.close();
			childBuilder = null;
		}
	}

	public void addLexem(String name) throws CommonException {
		if (IReserved.STMT_END.equals(name)) {
			IStatement builder = StatementFactory.getInstance().createStatement(name, build);
			builder.open(name);
			builder.close();
			return;
		}
		if (childIsActive()) {
			childBuilder.addLexem(name);
		} else {
			addOperand(name);
		}
	}
	
	public abstract void addOperand(String name) throws CommonException;
	public void open(String name) throws CommonException {}
	public void close() throws CommonException {}
}
