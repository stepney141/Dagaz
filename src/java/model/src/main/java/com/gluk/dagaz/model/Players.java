package com.gluk.dagaz.model;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.model.IPlayers;
import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.Value;

public class Players implements IPlayers {
	
	private List<String> turnOrder = new ArrayList<String>();
	private Map<String, Map<String, String>> syms = new HashMap<String, Map<String, String>>();

	public void addPlayer(String name) throws CommonException {
		turnOrder.add(name);
	}

	public int getTurn(int num) throws CommonException {
		if (turnOrder.isEmpty()) {
			throw new CommonException("Turn Order list is empty");
		}
		return ((num - 1) / turnOrder.size()) + 1;
	}

	public int getOrder(int num) throws CommonException {
		if (turnOrder.isEmpty()) {
			throw new CommonException("Turn Order list is empty");
		}
		return ((num - 1) % turnOrder.size()) + 1;
	}

	public String getPlayer(int num) throws CommonException {
		int ix = getOrder(num) - 1;
		return turnOrder.get(ix);
	}

	public void addSymmetry(String player, String from, String to) throws CommonException {
		Map<String, String> dirs = syms.get(player);
		if (dirs == null) {
			dirs = new HashMap<String, String>();
			syms.put(player, dirs);
		}
		if (dirs.containsKey(from)) {
			throw new CommonException("Symmetry [" + from+ "] for player [" + player +"] already defined");
		}
		dirs.put(from, to);
	}

	public String getDirection(String player, String from) {
		Map<String, String> dirs = syms.get(player);
		if (dirs == null) {
			return from;
		}
		String to = dirs.get(from);
		if (to == null) {
			return from;
		}
		return to;
	}

	public boolean isDefined(String name) {
		if (turnOrder.contains(name)) {
			return true;
		}
		for (Map<String, String> dirs: syms.values()) {
			if (dirs.containsKey(name)) {
				return true;
			}
		}
		return false;
	}
	
	public IValue get(String player, String name) throws CommonException {
		if (turnOrder.contains(name)) {
			return Value.create(player.equals(name));
		}
		return Value.create(getDirection(player, name));
	}
}
