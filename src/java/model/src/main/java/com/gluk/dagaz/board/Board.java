package com.gluk.dagaz.board;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public class Board implements IBoard {
	
	private Set<String> positions = new HashSet<String>();
	private Map<String, Map<String, String>> directions = new HashMap<String, Map<String, String>>();
	private Map<String, Map<String, Set<String>>> zones = new HashMap<String, Map<String, Set<String>>>();
	
	public Collection<String> getPositions() {
		return positions;
	}

	public String navigate(String name, String from, IEnvironment env) throws CommonException {
		if (positions.contains(name)) {
			return name;
		}
		if (env.isDefined(name)) {
			name = env.get(name).getString();
		}
		Map<String, String> links = directions.get(name);
		if (links == null) {
			throw new CommonException("Direction [" + name +"] undefined");
		}
		String to = links.get(from);
		if (to == null) {
			return "";
		}
		return to;
	}

	public boolean inZone(String name, String pos, IEnvironment env) throws CommonException {
		Map<String, Set<String>> players = zones.get(name);
		if (players == null) {
			throw new CommonException("Zone [" + name + "] undefined");
		}
		Set<String> list = players.get("");
		if (list.contains(pos)) {
			return true;
		}
		String player = env.get(IReserved.PLAYER_CURRENT).getString();
		list = players.get(player);
		return list.contains(pos);
	}

	public void addZone(String name, String player, String pos) throws CommonException {
		Map<String, Set<String>> players = zones.get(name);
		if (players == null) {
			players = new HashMap<String, Set<String>>();
			zones.put(name, players);
		}
		Set<String> list = players.get(player);
		if (list == null) {
			list = new HashSet<String>();
			players.put(player, list);
		}
		if (list.contains(pos)) {
			if (player.isEmpty()) {
				throw new CommonException("Position [" + name +"] already defined in Zone [" + name + "]");
			} else {
				throw new CommonException("Position [" + name +"] already defined in Zone [" + name + "] for Player [" + player + "]");
			}
		}
		list.add(pos);
	}

	public void addZone(String name, String pos) throws CommonException {
		addZone(name, "", pos);
	}

	public void addPosition(String name) throws CommonException {
		if (positions.contains(name)) {
			throw new CommonException("Position [" + name +"] already defined");
		}
		positions.add(name);
	}

	public void delPosition(String name) throws CommonException {
		if (!positions.contains(name)) {
			throw new CommonException("Position [" + name +"] undefined");
		}
		positions.remove(name);
	}

	public void addLink(String name, String from, String to) throws CommonException {
		Map<String, String> links = directions.get(name);
		if (links == null) {
			links = new HashMap<String, String>();
			directions.put(name, links);
		}
		if (links.containsKey(from)) {
			throw new CommonException("Direction [" + name+ "] from [" + from +"] already defined");
		}
		if (positions.contains(from) && positions.contains(to)) {
			links.put(from, to);
		}
	}

	public void delLink(String name, String from) throws CommonException {
		Map<String, String> links = directions.get(name);
		if (links == null) {
			throw new CommonException("Direction [" + name +"] undefined");
		}
		links.remove(from);
	}

	public boolean isDefined(String name) {
		return positions.contains(name) || directions.containsKey(name);
	}
}
