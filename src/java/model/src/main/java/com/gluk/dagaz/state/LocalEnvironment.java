package com.gluk.dagaz.state;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.state.IClonable;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.ITransactional;
import com.gluk.dagaz.exceptions.CommonException;

public class LocalEnvironment implements IEnvironment, ITransactional, IClonable {
	
	private IEnvironment env;
	private Map<String, Stack<Fixup>> fixups = new HashMap<String, Stack<Fixup>>();
	private int deep = 0;
	
	public LocalEnvironment(IEnvironment env) {
		this.env = env;
	}

	public void savepoint() {
		deep++;
	}

	public void rollback() throws CommonException {
		deep--;
		for (Stack<Fixup> s: fixups.values()) {
			while (!s.isEmpty()) {
				Fixup f = s.peek();
				if (f.getDeep() <= deep) {
					break;
				}
				s.pop();
			}
		}
	}

	public boolean isDefined(String name) throws CommonException {
		Stack<Fixup> s = fixups.get(name);
		if (s != null && !s.isEmpty()) {
			return true;
		}
		return env.isDefined(name);
	}

	public void let(String name, IValue value) {
		Stack<Fixup> s = fixups.get(name);
		if (s == null) {
			s = new Stack<Fixup>();
			fixups.put(name, s);
		}
		s.push(new Fixup(value, deep));
	}

	public IValue get(String name) throws CommonException {
		if (isDefined(name)) {
			return fixups.get(name).peek().getValue();
		}
		return env.get(name);
	}

	public IValue get(String name, String opt) throws CommonException {
		if (isDefined(name)) {
			return get(name);
		}
		return env.get(name, opt);
	}

	public void set(String name, IValue value) throws CommonException {
		Stack<Fixup> s = fixups.get(name);
		if (s != null && !s.isEmpty()) {
			Fixup f = s.peek();
			if (f.getDeep() < deep) {
				f = new Fixup(value, deep);
				s.push(f);
			} else {
				f.setValue(value);
			}
		}
		throw new CommonException("Fixup [" + name + "] not found");
	}

	public void del(String name) throws CommonException {
		Stack<Fixup> s = fixups.get(name);
		if (s != null && !s.isEmpty()) {
			Fixup f = s.peek();
			if (f.getDeep() >= deep) {
				s.pop();
			}
		}
		throw new CommonException("Fixup [" + name + "] not found");
	}

	public void copyTo(IEnvironment env) throws CommonException {
		for (String name: fixups.keySet()) {
			Stack<Fixup> s = fixups.get(name);
			if (!s.isEmpty()) {
				env.set(name, s.peek().getValue());
			}
		}
	}
}
