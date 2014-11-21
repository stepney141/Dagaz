package com.gluk.dagaz.rules.board;

import java.util.Map;
import java.util.Set;

import com.gluk.dagaz.api.exceptions.BoardException;
import com.gluk.dagaz.api.rules.board.IBoard;
import com.gluk.dagaz.api.rules.board.IBoardOperationCallback;

public class Board extends BoardConfiguration implements IBoard {

	public boolean inZone(String position, String name, String player) throws BoardException {
		Map<String, Set<String>> zl = zones.get(name);
		if (zl == null) {
			throw new BoardException("Zone [" + name + "] undefined");
		}
		Set<String> pl = zl.get(player);
		if ((pl != null) && pl.contains(position)) {
			return true;
		}
		pl = zl.get("");
		return pl.contains(position);
	}

	public String changePosition(String position, String direction, String player) throws BoardException {
		Map<String, String> s = symmetries.get(direction);
		if (s != null) {
			String d = s.get(player);
			if (d != null) {
				direction = d;
			}
		}
		String np = null;
		DirectionList d = positions.get(position);
		if (d != null) {
			np = d.getPosition(direction);
		}
		Map<String, String> gl = synonyms.get(position);
		if (gl != null) {
			String op = gl.get(player);
			if (op == null) {
				op = gl.get("");
			}
			if (op != null) {
				d = positions.get(op);
				if (d != null) {
					String p = d.getPosition(direction);
					if (p != null) {
						if (np != null) {
							throw new BoardException("Duplicate direction [" + direction + "] from [" + position + "]");
						}
						np = p;
					}
				}
			}
		}
		if (np == null) {
			throw new BoardException("Direction [" + direction + "] from [" + position + "] not found");
		}
		gl = gates.get(np);
		if (gl != null) {
			String p = gl.get(player);
			if (p == null) {
				p = gl.get("");
			}
			if (p != null) {
				np = p;
			}
		}
		return np;
	}

	public void execOperation(String name, String player, IBoardOperationCallback callback) throws BoardException {
		Map<String, Map<String, String>> pl = operations.get(name);
		if (pl != null) {
			Map<String, String> o = pl.get(player);
			if (o == null) {
				o = pl.get("");
			}
			if (o != null) {
				for (String p: o.keySet()) {
					callback.changePosition(p, o.get(p));
				}
			}
		}
	}
}
