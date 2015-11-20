package com.gluk.dagaz.model;

import java.util.ArrayList;
import java.util.List;

import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.exceptions.CommonException;

public class Grid {
	
	private IBoard board;
	private List<List<String>> dimensions = new ArrayList<List<String>>();
	
	public Grid(IBoard board) {
		this.board = board;
	}
	
	public String toString() {
		StringBuffer sb = new StringBuffer();
		boolean f = false;
		for (List<String> x: dimensions) {
			if (f) {
				sb.append(" x ");
			}
			boolean ff = false;
			for (String s: x) {
				if (ff) {
					sb.append(",");
				}
				sb.append(s);
				ff = true;
			}
			f = true;
		}
		return sb.toString();
	}
	
	private void addRange(String dimension, int start, int end, boolean isNumeric, List<String> r) throws CommonException {
		while (true) {
			StringBuffer sb = new StringBuffer();
			if (isNumeric) {
				sb.append(Integer.toString(start));
			} else {
				sb.append((char)(byte)start);
			}
			if (r.contains(sb.toString())) {
				throw new CommonException("Invalid dimension [" + dimension + "]");
			}
			r.add(sb.toString());
			if (start == end) break;
			if (start > end) {
				start--;
			} else {
				start++;
			}
		}
	}
	
	public void addDimension(String dimension) throws CommonException {
		StringBuffer sb = new StringBuffer();
		List<String> r = new ArrayList<String>();
		int start = 0;
		int current = -1;
		boolean isNumeric = false;
		for (Character c: dimension.toCharArray()) {
			if (c.equals('-')) {
				if (isNumeric) {
					start = current;
				} else {
					if (sb.length() == 0) {
						throw new CommonException("Invalid dimension [" + dimension + "]");
					}
					start = (int)sb.toString().charAt(0);
				}
				current = -1;
				continue;
			}
			if (Character.isDigit(c)) {
				if (current > 0) {
					current *= 10;
				} else {
					current = 0;
				}
				current += (int)c - (int)'0'; 
				isNumeric = true;
				continue;
			}
			if (Character.isLetter(c) && (start > 0)) {
				current = (int)c;
			}
			if ((start > 0)&&(current >= 0)) {
				addRange(dimension, start, current, isNumeric, r);
				isNumeric = false;
				start = 0;
				current = -1;
				sb.setLength(0);
				continue;
			}
			if (Character.isLetter(c)) {
				if (isNumeric) {
					throw new CommonException("Invalid dimension [" + dimension + "]");
				}
				if (start > 0) {
					addRange(dimension, start, (int)c, false, r);
					start = 0;
					continue;
				}
				sb.append(c);
				continue;
			}
			if (sb.length() > 0) {
				if (isNumeric || r.contains(sb.toString())) {
					throw new CommonException("Invalid dimension [" + dimension + "]");
				}
				r.add(sb.toString());
				sb.setLength(0);
			}
			if (current >= 0) {
				if (!isNumeric || r.contains(Integer.toString(current))) {
					throw new CommonException("Invalid dimension [" + dimension + "]");
				}
				r.add(Integer.toString(current));
				current = -1;
			}
		}
		if ((start > 0)&&(current >= 0)) {
			if (!isNumeric) {
				throw new CommonException("Invalid dimension [" + dimension + "]");
			}
			addRange(dimension, start, current, isNumeric, r);
			isNumeric = false;
			start = 0;
			current = -1;
		}
		if (sb.length() > 0) {
			if (isNumeric || r.contains(sb.toString())) {
				throw new CommonException("Invalid dimension [" + dimension + "]");
			}
			r.add(sb.toString());
			sb.setLength(0);
		}
		if (current >= 0) {
			if (!isNumeric || r.contains(Integer.toString(current))) {
				throw new CommonException("Invalid dimension [" + dimension + "]");
			}
			r.add(Integer.toString(current));
			current = 0;
			isNumeric = false;
		}
		dimensions.add(r);
	}
	
	private void generatePositions(int ix, StringBuffer sb) throws CommonException {
		int sz = sb.length();
		if (ix >= dimensions.size()) {
			board.addPosition(sb.toString());
			return;
		}
		List<String> d = dimensions.get(ix);
		if (d.isEmpty()) {
			throw new CommonException("Dimension [" + Integer.toString(ix) + "] is empty");
		}
		for (String s: d) {
			sb.setLength(sz);
			sb.append(s);
			generatePositions(ix + 1, sb);
		}
	}
	
	public void createPositions() throws CommonException {
		StringBuffer sb = new StringBuffer();
		generatePositions(0, sb);
	}
	
	private void generateLinks(int ix, String name, List<Integer> deltas, StringBuffer startPosition, StringBuffer endPosition) throws CommonException {
		int stSz = startPosition.length();
		int enSz = endPosition.length();
		if (ix >= dimensions.size()) {
			if (board.isDefined(startPosition.toString()) && board.isDefined(endPosition.toString())) {
				board.addLink(name, startPosition.toString(), endPosition.toString());
			}
			return;
		}
		List<String> d = dimensions.get(ix);
		for (int i = 0; i < d.size(); i++) {
			startPosition.setLength(stSz);
			startPosition.append(d.get(i));
			endPosition.setLength(enSz);
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
	
	public void addDirection(String name, List<Integer> deltas) throws CommonException {
		StringBuffer startPosition = new StringBuffer();
		StringBuffer endPosition = new StringBuffer();
		generateLinks(0, name, deltas, startPosition, endPosition);
	}
}
