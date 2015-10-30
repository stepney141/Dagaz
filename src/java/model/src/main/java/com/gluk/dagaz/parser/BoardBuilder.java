package com.gluk.dagaz.parser;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.w3c.dom.Node;
import org.w3c.dom.traversal.NodeIterator;

import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.parser.IBuilderCallback;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.model.Board;
import com.gluk.dagaz.model.Grid;
import com.gluk.dagaz.runtime.Value;

public class BoardBuilder extends AbstractBuilder {
	
	private Grid genDims(IBoard board, NodeIterator nl) throws CommonException {
		Grid g = null;
		Node n;
		while ((n = nl.nextNode())!= null) {
			if (g == null) {
				g = new Grid(board);
			}
			NodeIterator vl = getIterator(n, V_XP);
			Node v;
			while ((v = vl.nextNode())!= null) {
				g.addDimension(getText(v));
			}
		}
		return g;
	}

	private void genDirs(Grid g, NodeIterator nl) throws CommonException {
		Node n;
		while ((n = nl.nextNode())!= null) {
			String name = getName(n);
			List<Integer> deltas = new ArrayList<Integer>();
			NodeIterator vl = getIterator(n, V_XP);
			Node v;
			while ((v = vl.nextNode())!= null) {
				try {
					deltas.add(Integer.parseInt(getText(v)));
				} catch (Exception e) {
					throw new CommonException(e.toString(), e);
				}
			}
			if (deltas.isEmpty()) {
				throw new CommonException("Dir List is empty");
			}
			g.addDirection(name, deltas);
		}
	}
	
	private void buildAttribute(IBoard board, Node node, String piece) throws CommonException {
		NodeIterator vl = getIterator(node, V_XP);
		Node v = vl.nextNode();
		if (v == null) {
			vl = getIterator(node, N_XP);
			v = vl.nextNode();
			if (v == null) {
				throw new CommonException("Syntax Error");
			}
			String name = getTag(v);
			v = vl.nextNode();
			if (v == null) {
				throw new CommonException("Syntax Error");
			}
			String value = getTag(v);
			if (vl.nextNode() != null) {
				throw new CommonException("Syntax Error");
			}
			board.setDefaultValue(piece, name, Value.create(value));
			return;
		}
		String name = getText(v);
		v = vl.nextNode();
		if (v == null) {
			throw new CommonException("Syntax Error");
		}
		String value = getText(v);
		if (vl.nextNode() != null) {
			throw new CommonException("Syntax Error");
		}
		board.setDefaultValue(piece, name, Value.create(value));
	}
	
	private void buildAttributes(IBoard board, Node node, Node b) throws CommonException {
		NodeIterator al = getIterator(b, ATTR_XP);
		Node a;
		while ((a = al.nextNode())!= null) {
			buildAttribute(board, a, "");
		}
		NodeIterator nl = getIterator(b, PIECE_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			String piece = getName(n);
			al = getIterator(n, ATTR_XP);
			while ((a = al.nextNode())!= null) {
				buildAttribute(board, a, piece);
			}
		}
	}
	
	private void buildPositions(IBoard board, Node b) throws CommonException {
		NodeIterator nl = getIterator(b, POS_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			NodeIterator vl = getIterator(n, V_XP);
			Node v;
			while ((v = vl.nextNode())!= null) {
				board.addPosition(getText(v));
			}
			vl = getIterator(n, N_XP);
			while ((v = vl.nextNode())!= null) {
				board.addPosition(getTag(v));
			}
		}
		nl = getIterator(b, KILL_XP);
		while ((n = nl.nextNode())!= null) {
			NodeIterator vl = getIterator(n, V_XP);
			Node v;
			while ((v = vl.nextNode())!= null) {
				board.delPosition(getText(v));
			}
			vl = getIterator(n, N_XP);
			while ((v = vl.nextNode())!= null) {
				board.delPosition(getTag(v));
			}
		}
	}
	
	private void buildLinks(IBoard board, Node b) throws CommonException {
		NodeIterator nl = getIterator(b, LINK_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			String nm = getName(n);
			NodeIterator vl = getIterator(n, V_XP);
			Node v = vl.nextNode();
			if (v == null) {
				vl = getIterator(n, N_XP);
				v = vl.nextNode();
				if (v == null) {
					throw new CommonException("Syntax Error");
				}
				String src = getText(v);
				v = vl.nextNode();
				if (v == null) {
					throw new CommonException("Syntax Error");
				}
				String dst = getText(v);
				if (vl.nextNode() != null) {
					throw new CommonException("Syntax Error");
				}
				board.addLink(nm, src, dst);
				continue;
			}
			String src = getText(v);
			v = vl.nextNode();
			if (v == null) {
				throw new CommonException("Syntax Error");
			}
			String dst = getText(v);
			if (vl.nextNode() != null) {
				throw new CommonException("Syntax Error");
			}
			board.addLink(nm, src, dst);
		}
		nl = getIterator(b, UNLINK_XP);
		while ((n = nl.nextNode())!= null) {
			String nm = getName(n);
			NodeIterator vl = getIterator(n, V_XP);
			Node v;
			while ((v = vl.nextNode())!= null) {
				board.delLink(nm, getText(v));
			}
			vl = getIterator(n, N_XP);
			while ((v = vl.nextNode())!= null) {
				board.delLink(nm, getTag(v));
			}
		}
	}
	
	public void build(Node node, IBuilderCallback callback) throws CommonException {
		Map<Grid, Node> grids = new HashMap<Grid, Node>();
		NodeIterator bl = getIterator(node, BOARD_XP);
		Node b;
		while ((b = bl.nextNode())!= null) {
			String name = getName(b);
			Board board = new Board();
			buildAttributes(board, node, b);
			NodeIterator nl = getIterator(b, GRID_XP);
			Node n;
			while ((n = nl.nextNode())!= null) {
				NodeIterator vl = getIterator(n, DIM_XP);
				Grid g = genDims(board, vl);
				if (g != null) {
					grids.put(g, n);
					g.createPositions();
				}
			}
			nl = getIterator(b, DIM_XP);
			Grid grid = genDims(board, nl);
			if (grid != null) {
				grids.put(grid, b);
				grid.createPositions();
			}
			buildPositions(board, b);
			for (Grid g: grids.keySet()) {
				n = grids.get(g);
				NodeIterator vl = getIterator(n, DIR_XP);
				genDirs(g, vl);
			}
			buildLinks(board, b);
			callback.addBoard(name, board);
		}
	}
}
