package com.gluk.dagaz.state;

import java.util.Collection;

import com.gluk.dagaz.api.state.IPiece;

public class Piece extends AbstractValueSet implements IPiece {
	
	String player;
	String type;
	
	public Piece(String player, String type) {
		this.player = player;
		this.type = type;
	}
	
	public Piece(IPiece p) {
		this.player = p.getPlayer();
		this.type   = p.getType();
		for (String name: p.getPersistentValues()) {
			setValue(name, p.getValue(name));
		}
	}

	public String getPlayer() {
		return player;
	}

	public String getType() {
		return type;
	}

	public String getHashKey() {
		StringBuffer sb = new StringBuffer();
		sb.append(type);
		sb.append('@');
		sb.append(player);
		Collection<String> names = getPersistentValues();
		if (!names.isEmpty()) {
			sb.append(':');
			for (String name: names) {
				sb.append(name);
				sb.append('=');
				sb.append(getValue(name));
			}
		}
		return sb.toString();
	}

	public boolean isEqual(IPiece p) {
		if (!player.equals(p.getPlayer()) ||
	        !type.equals(p.getType())) {
			return false;
		}
		return super.isEqual(p);
	}
}
