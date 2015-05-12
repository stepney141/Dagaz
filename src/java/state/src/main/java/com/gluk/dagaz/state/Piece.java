package com.gluk.dagaz.state;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.state.IPiece;

public class Piece implements IPiece {
	
	String player;
	String type;
	
	private Map<String, String> values = new HashMap<String, String>(); 
	
	public Piece(String player, String type) {
		this.player = player;
		this.type = type;
	}

	public String getPlayer() {
		return player;
	}

	public String getType() {
		return type;
	}

	public String getValue(String name) {
		String r = values.get(name);
		if (r == null) {
			r = "";
		}
		return r;
	}

	public void setValue(String name, String value, boolean isPersistent) {
		String r = values.get(name);
		if ((r != null) && value.equals(r)) {
			return;
		}
		Piece p = new Piece(player, type);
		for (String nm: values.keySet()) {
			p.values.put(nm, values.get(nm));
		}
		p.values.put(name, value);
	}
	
	public void setValue(String name, String value) {
		setValue(name, value, true);
	}

	public boolean isPersistent() {
		return true;
	}

	public int getValuesCount() {
		return values.size();
	}

	public boolean isValuePresent(String name) {
		return values.containsKey(name);
	}

	public String getHashKey() {
		StringBuffer sb = new StringBuffer();
		sb.append(type);
		sb.append('@');
		sb.append(player);
		if (values.size() > 0) {
			sb.append(':');
			for (String name: values.keySet()) {
				sb.append(name);
				sb.append('=');
				sb.append(values.get(name));
			}
		}
		return sb.toString();
	}
}
