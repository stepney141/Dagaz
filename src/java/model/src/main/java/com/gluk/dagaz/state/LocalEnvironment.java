package com.gluk.dagaz.state;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.ITransactional;
import com.gluk.dagaz.api.state.IValue;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.Value;

public class LocalEnvironment implements IEnvironment, ITransactional {
	
	private IEnvironment env;
	private Map<String, Stack<DataFixup>> fixups = new HashMap<String, Stack<DataFixup>>();
	private int deep = 0;
	
	public LocalEnvironment(IEnvironment env) {
		this.env = env;
	}

	public void savepoint() {
		deep++;
	}

	public boolean rollback() throws CommonException {
		if (deep == 0) {
			return false;
		}
		deep--;
		for (Stack<DataFixup> s: fixups.values()) {
			while (!s.isEmpty()) {
				DataFixup f = s.peek();
				if (f.getDeep() <= deep) {
					break;
				}
				s.pop();
			}
		}
		return true;
	}
	
	private static boolean isNumber(String s) {
		for (Character c: s.toCharArray()) {
			if (!Character.isDigit(c)) {
				return false;
			}
		}
		return !s.isEmpty();
	}
	
	private static boolean isQuoted(String s) {
		if (s.length() < 2) return false;
		if (s.charAt(0) != '\"') return false;
		if (s.charAt(s.length() - 1) != '\"') return false;
		return true;
	}
	
	private static String unquote(String s) {
		return s.substring(1, s.length() - 1);
	}
	
	public boolean isKnown(String name) {
		Stack<DataFixup> s = fixups.get(name);
		return (s != null) && !s.isEmpty();
	}

	public boolean isDefined(String name) {
		if (name.equals(IReserved.LOCAL_TRUE)  ||
			name.equals(IReserved.LOCAL_FALSE) ||
			isNumber(name) || isQuoted(name)) {
			return true;
		}
		if (isKnown(name)) {
			return true;
		}
		return env.isDefined(name);
	}

	public void let(String name, IValue value) throws CommonException {
		if (name.equals(IReserved.LOCAL_TRUE)  ||
			name.equals(IReserved.LOCAL_FALSE) ||
			isNumber(name) || isQuoted(name)) {
			throw new CommonException("Constant value [" + name + "]");
		}
		Stack<DataFixup> s = fixups.get(name);
		if (s == null) {
			s = new Stack<DataFixup>();
			fixups.put(name, s);
		}
		s.push(new DataFixup(value, deep));
	}

	public IValue get(String name) throws CommonException {
		if (name.equals(IReserved.LOCAL_TRUE)) {
			return Value.create(true);
		}
		if (name.equals(IReserved.LOCAL_FALSE)) {
			return Value.create(false);
		}
		if (isNumber(name)) {
			return Value.create(name);
		}
		if (isQuoted(name)) {
			return Value.create(unquote(name));
		}
		if (isKnown(name)) {
			return fixups.get(name).peek().getValue();
		}
		return env.get(name);
	}

	public void set(String name, IValue value) throws CommonException {
		if (name.equals(IReserved.LOCAL_TRUE)  ||
			name.equals(IReserved.LOCAL_FALSE) ||
			isNumber(name) || isQuoted(name)) {
			throw new CommonException("Constant value [" + name + "]");
		}
		Stack<DataFixup> s = fixups.get(name);
		if (s != null && !s.isEmpty()) {
			DataFixup f = s.peek();
			if (f.getDeep() < deep) {
				f = new DataFixup(value, deep);
				s.push(f);
			} else {
				f.setValue(value);
			}
			return;
		}
		env.set(name, value);
	}

	public void del(String name) throws CommonException {
		if (name.equals(IReserved.LOCAL_TRUE)  ||
			name.equals(IReserved.LOCAL_FALSE) ||
			isNumber(name) || isQuoted(name)) {
			throw new CommonException("Constant value [" + name + "]");
		}
		Stack<DataFixup> s = fixups.get(name);
		if (s != null && !s.isEmpty()) {
			DataFixup f = s.peek();
			if (f.getDeep() >= deep) {
				s.pop();
			}
			return;
		}
		throw new CommonException("Fixup [" + name + "] not found");
	}

	public void clear() {
		fixups.clear();
		deep = 0;
	}
}
