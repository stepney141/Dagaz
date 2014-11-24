package com.gluk.dagaz.rules.board;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.exceptions.BoardException;
import com.gluk.dagaz.api.rules.board.IBoardConfiguration;
import com.gluk.dagaz.api.rules.board.IGrid;

public class Grid implements IGrid {
	
	private IBoardConfiguration board;
	private List<List<String>> dimensions = new ArrayList<List<String>>();
	private boolean isGenerated = false;
	
	public Grid(IBoardConfiguration board) {
		this.board = board;
	}
	
	private void addRange(String dimension, int start, int end, boolean isNumeric, List<String> r) throws BoardException {
		if (start == end) {
			start--;
		}
		while (start != end) {
			StringBuffer sb = new StringBuffer();
			if (isNumeric) {
				sb.append(Integer.toString(start));
			} else {
				sb.append((char)(byte)start);
			}
			if (r.contains(sb.toString())) {
				throw new BoardException("Invalid dimension [" + dimension + "]");
			}
			r.add(sb.toString());
			if (start > end) {
				start--;
			} else {
				start++;
			}
		}
	}
	
	public void addDimension(String dimension) throws BoardException {
		List<String> r = new ArrayList<String>();
		int start = 0;
		int current = 0;
		boolean isNumeric = false;
		for (Character c: dimension.toCharArray()) {
			if (c.equals('_')) {
				start = current;
				current = 0;
				continue;
			}
			if (Character.isDigit(c)) {
				current *= 10;
				current += (int)c - (int)'0'; 
				isNumeric = true;
				continue;
			}
			if ((start > 0)&&(current > 0)) {
				addRange(dimension, start, current, isNumeric, r);
				isNumeric = false;
				start = 0;
				current = 0;
			}
			if (Character.isLetter(c)) {
				if (isNumeric) {
					throw new BoardException("Invalid dimension [" + dimension + "]");
				}
				if (start > 0) {
					addRange(dimension, start, (int)c, false, r);
					start = 0;
					continue;
				}
				StringBuffer sb = new StringBuffer();
				sb.append(c);
				if (r.contains(sb.toString())) {
					throw new BoardException("Invalid dimension [" + dimension + "]");
				}
				r.add(sb.toString());
			}
		}
		if ((start > 0)&&(current > 0)) {
			addRange(dimension, start, current, isNumeric, r);
		}
		dimensions.add(r);
	}
	
	private void generatePositions(int ix, StringBuffer sb) throws BoardException {
		if (ix >= dimensions.size()) {
			board.createPosition(sb.toString());
			return;
		}
		List<String> d = dimensions.get(ix);
		if (d.isEmpty()) {
			throw new BoardException("Dimension [" + Integer.toString(ix) + "] is empty");
		}
		for (String s: d) {
			sb.setLength(ix);
			sb.append(s);
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
		List<String> d = dimensions.get(ix);
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
