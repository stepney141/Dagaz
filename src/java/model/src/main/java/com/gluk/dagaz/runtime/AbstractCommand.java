package com.gluk.dagaz.runtime;

import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;

public abstract class AbstractCommand implements ICommand {
	
	private boolean isDeferred = false;
	
	public boolean isDeferred() {
		return isDeferred;
	}
	
	public void setDeferred() {
		isDeferred = true;
	}
	
	public void addArgument(Object arg) throws CommonException {}
	public String getValueName() {return null;}
}
