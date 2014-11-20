package com.gluk.dagaz.state;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.api.state.IValue;

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

	public IValue setValue(String name, String value) {
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
}
