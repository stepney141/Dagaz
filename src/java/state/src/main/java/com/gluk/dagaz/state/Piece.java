package com.gluk.dagaz.state;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.api.state.IValueSet;

public class Piece implements IPiece {
	
	String player;
	String type;
	
	private Map<String, String> values = new HashMap<String, String>(); 
	
	public Piece(String player, String type) {
		this.player = player;
		this.type = type;
	}

	public String getOwner() {
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

	public IValueSet setValue(String name, String value) {
		String r = values.get(name);
		if ((r != null) && value.equals(r)) {
			return this;
		}
		Piece p = new Piece(player, type);
		for (String nm: values.keySet()) {
			p.values.put(nm, values.get(nm));
		}
		p.values.put(name, value);
		return p;
	}

	public boolean isClonable() {
		return true;
	}

	public int getValuesCount() {
		return values.size();
	}

	public boolean isValuePresent(String name) {
		return values.containsKey(name);
	}

	public boolean isEqualValues(IValueSet value) {
		if (value.getValuesCount() != values.size()) return false;
		for (String name: values.keySet()) {
			if (!value.isValuePresent(name)) return false;
			if (!values.get(name).equals(value.getValue(name))) return false;
		}
		return true;
	}

	public boolean isEqual(IPiece piece) {
		if (!piece.getOwner().equals(player)) return false;
		if (!piece.getType().equals(type)) return false;
		return isEqualValues(piece);
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
