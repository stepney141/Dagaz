package com.gluk.dagaz.rules.board;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.gluk.dagaz.api.exceptions.BoardException;
import com.gluk.dagaz.api.rules.board.IBoardConfiguration;

public abstract class BoardConfiguration implements IBoardConfiguration {
	
	protected Map<String, DirectionList> positions = new HashMap<String, DirectionList>();
	protected Map<String, Map<String, Set<String>>> zones = new HashMap<String, Map<String, Set<String>>>();
	protected Map<String, Map<String, String>> symmetries = new HashMap<String, Map<String, String>>();
	protected Map<String, Map<String, String>> synonyms = new HashMap<String, Map<String, String>>();
	protected Map<String, Map<String, String>> gates = new HashMap<String, Map<String, String>>();
	protected Map<String, Map<String, Map<String, String>>> operations = new HashMap<String, Map<String, Map<String, String>>>();
	protected Map<String, String> counters = new HashMap<String, String>();  

	public void createPosition(String position) throws BoardException {
		if (positions.containsKey(position)) {
			throw new BoardException("Duplicate position [" + position + "]");
		}
		positions.put(position, new DirectionList());
	}

	public void deletePosition(String position) throws BoardException {
		positions.remove(position);
	}

	public void addLink(String name, String startPosition, String endPosition) throws BoardException {
		DirectionList d = positions.get(startPosition);
		if (d == null) {
			throw new BoardException("Position [" + startPosition + "] not found");
		}
		if (positions.containsKey(endPosition)) {
			d.addDirection(name, endPosition);
		}
	}

	public void addZone(String name, String position, String player) throws BoardException {
		Map<String, Set<String>> zl = zones.get(name);
		if (zl == null) {
			zl = new HashMap<String, Set<String>>();
			zones.put(name, zl);
		}
		Set<String> z = zl.get(player);
		if (z == null) {
			z = new HashSet<String>();
			zl.put(player, z);
		}
		z.add(position);
	}

	public void addZone(String name, String position) throws BoardException {
		addZone(name, position, "");
	}

	public void addSymmetry(String oldDirection, String newDirection, String player) throws BoardException {
		Map<String, String> s = symmetries.get(oldDirection);
		if (s == null) {
			s = new HashMap<String, String>();
			symmetries.put(oldDirection, s);
		}
		s.put(player, newDirection);
	}

	private void addGate(String oldPosition, String newPosition, String player) throws BoardException {
		Map<String, String> gl = gates.get(oldPosition);
		if (gl == null) {
			gl = new HashMap<String, String>();
			gates.put(oldPosition, gl);
		}
		if (gl.containsKey(player)) {
			throw new BoardException("Duplicate synonym [" + newPosition + "] from [" + oldPosition + "]");
		}
		gl.put(player, newPosition);
	}
	
	public void addSynonym(String oldPosition, String newPosition, String player, boolean isGate) throws BoardException {
		if (isGate) {
			addGate(oldPosition, newPosition, player);
			return;
		}
		Map<String, String> gl = synonyms.get(oldPosition);
		if (gl == null) {
			gl = new HashMap<String, String>();
			synonyms.put(oldPosition, gl);
		}
		if (gl.containsKey(player)) {
			throw new BoardException("Duplicate synonym [" + newPosition + "] from [" + oldPosition + "]");
		}
		gl.put(player, newPosition);
	}

	public void addSynonym(String oldPosition, String newPosition, boolean isGate) throws BoardException {
		addSynonym(oldPosition, newPosition, "", isGate);
	}

	public void addOperation(String name, String oldPosition, String newPosition, String player) throws BoardException {
		Map<String, Map<String, String>> pl = operations.get(name);
		if (pl == null) {
			pl = new HashMap<String, Map<String, String>>();
			operations.put(name, pl);
		}
		Map<String, String> ol = pl.get(player);
		if (ol == null) {
			ol = new HashMap<String, String>();
			pl.put(player, ol);
		}
		ol.put(oldPosition, newPosition);
	}

	public void addOperation(String name, String oldPosition, String newPosition) throws BoardException {
		addOperation(name, oldPosition, newPosition, "");
	}

	public void addCounter(String name, String value, String player) throws BoardException {
		StringBuffer sb = new StringBuffer();
		sb.append(name);
		sb.append("@");
		sb.append(player);
		counters.put(sb.toString(), value);
	}

	public void addCounter(String name, String value) throws BoardException {
		counters.put(name, value);
	}
}
