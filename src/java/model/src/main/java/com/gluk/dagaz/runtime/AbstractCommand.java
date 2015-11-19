package com.gluk.dagaz.runtime;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;

public abstract class AbstractCommand implements ICommand {
	
	private boolean isDeferred = false;
	private String mnemonic;
	private List<String> args = new ArrayList<String>();
	
	public AbstractCommand(String mnemonic) {
		this.mnemonic = mnemonic;
	}
	
	public boolean isDeferred() {
		return isDeferred;
	}
	
	public void setDeferred() {
		isDeferred = true;
	}
	
	public void addArgument(Object arg) throws CommonException {
		args.add(arg.toString());
	}
	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append(mnemonic);
		sb.append("\t");
		boolean f = false;
		for (String s: args) {
			if (f) {
				sb.append(",");
			}
			sb.append(s);
			f = true;
		}
		return sb.toString();
	}
	
	public int getOffset() {
		return 0;
	}
	
	public String getValueName() {return null;}
}
