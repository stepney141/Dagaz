package com.gluk.z2j.model;

import java.util.HashMap;
import java.util.Map;

import com.gluk.z2j.api.loader.IEnvironment;

public class Environment implements IEnvironment {
	
	private IEnvironment parent = null;
	private Map<String, String> values = new HashMap<String, String>();
	
	public Environment(IEnvironment parent) {
		this.parent = parent;
	}
	
	public void addValue(String value) {
		String name = String.format("$%d", values.size() + 1);
		values.put(name, value);
	}

	private String getValueInternal(String name) {
		String r = values.get(name);
		if (r != null) {
			return r;
		}
		if (parent != null) {
			return parent.getValue(name);
		}
		return name;
	}
	
	private boolean isDigit(char c) {
		switch (c) {
		  case '0':
		  case '1':
		  case '2':
		  case '3':
		  case '4':
		  case '5':
		  case '6':
		  case '7':
		  case '8':
		  case '9':
			return true;
		  default:
			return false;
		}
	}

	public String getValue(String name) {
		StringBuffer sb = new StringBuffer();
		int offest = 0;
		while (offest < name.length()) {
			int ix = name.indexOf('$', offest);
			if (ix < 0) {
				sb.append(name.substring(offest));
				break;
			}
			if (ix > offest) {
				sb.append(name.substring(offest, ix));
			}
			int i = ix + 1;
			while ((i < name.length()) && isDigit(name.charAt(i))) {
				i++;
			}
			sb.append(getValueInternal(name.substring(ix, i)));
			offest = i;
		}
		return sb.toString();
	}
}
