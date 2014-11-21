package com.gluk.dagaz.rules.board;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.exceptions.BoardException;
import com.gluk.dagaz.api.rules.board.IBoardConfiguration;
import com.gluk.dagaz.api.rules.board.IGrid;

public class Grid implements IGrid {
	
	private IBoardConfiguration board;
	private List<List<Character>> dimensions = new ArrayList<List<Character>>();
	private boolean isGenerated = false;
	
	public Grid(IBoardConfiguration board) {
		this.board = board;
	}
	
	private void scanCharacters(String dimension, byte start, byte end, List<Character> r) throws BoardException {
		for (byte b = start; b <= end; b++) {
			Character p = new Character((char)b);
			if (r.contains(p)) {
				throw new BoardException("Invalid dimension [" + dimension + "]");
			}
			r.add(p);
		}
	}

	public void addDimension(String dimension) throws BoardException {
		List<Character> r = new ArrayList<Character>();
		byte start = 0;
		Character p = null;
		for (Character c: dimension.toCharArray()) {
			if (Character.isDigit(c) || Character.isLetter(c)) {
				if (start != 0) {
					byte end = (byte)(char)c;
					if (start < end) {
						scanCharacters(dimension, start, end, r);
					} else {
						scanCharacters(dimension, end, start, r);
					}
					start = 0;
				} else {
					p = c;
				}
			}
			if (c.equals('_')) {
				start = (byte)(char)p;
				p = null;
			}
			if (p != null) {
				if (r.contains(p)) {
					throw new BoardException("Invalid dimension [" + dimension + "]");
				}
				r.add(p);
			}
		}
		if (r.isEmpty()) {
			throw new BoardException("Empty dimension [" + dimension + "]");
		}
		dimensions.add(r);
	}
	
	private void generatePositions(int ix, StringBuffer sb) throws BoardException {
		if (ix >= dimensions.size()) {
			board.createPosition(sb.toString());
			return;
		}
		List<Character> d = dimensions.get(ix);
		if (d.isEmpty()) {
			throw new BoardException("Dimension [" + Integer.toString(ix) + "] is empty");
		}
		for (Character c: d) {
			sb.setLength(ix);
			sb.append(c);
			generatePositions(ix + 1, sb);
		}
	}

	public void generate() throws BoardException {
		if (!isGenerated) {
			isGenerated = true;
			if (dimensions.isEmpty()) {
				throw new BoardException("No dimensions");
			}
			StringBuffer sb = new StringBuffer();
			generatePositions(0, sb);
		}
	}
	
	private void generateLinks(int ix, String name, List<Integer> deltas, StringBuffer startPosition, StringBuffer endPosition) throws BoardException {
		if (ix >= dimensions.size()) {
			board.addLink(name, startPosition.toString(), endPosition.toString());
			return;
		}
		List<Character> d = dimensions.get(ix);
		for (int i = 0; i < d.size(); i++) {
			startPosition.setLength(ix);
			startPosition.append(d.get(i));
			endPosition.setLength(ix);
			if (ix < deltas.size()) {
				int j = i + deltas.get(ix);
				if (j < 0) continue;
				if (j >= d.size()) continue;
				endPosition.append(d.get(j));
			} else {
				endPosition.append(d.get(0));
			}
			generateLinks(ix + 1, name, deltas, startPosition, endPosition);
		}
		
	}

	public void addDirection(String name, List<Integer> deltas) throws BoardException {
		generate();
		StringBuffer startPosition = new StringBuffer();
		StringBuffer endPosition = new StringBuffer();
		generateLinks(0, name, deltas, startPosition, endPosition);
	}
}
