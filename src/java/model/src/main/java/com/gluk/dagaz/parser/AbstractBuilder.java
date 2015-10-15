package com.gluk.dagaz.parser;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.parser.IBuilder;
import com.gluk.dagaz.exceptions.CommonException;

public abstract class AbstractBuilder implements IBuilder {
	
	protected IBuild build = null;
	private IBuilder childBuilder = null;
	
	public void setBuild(IBuild build) {
		this.build = build;
	}

	public boolean childIsActive() {
		return childBuilder != null;
	}

	public void openChild(String name) throws CommonException {
		if (childIsActive()) {
			childBuilder.openChild(name);
		} else {
			childBuilder = BuilderFactory.getInstance().createBuilder(name, build);
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
			IBuilder builder = BuilderFactory.getInstance().createBuilder(name, build);
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
