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
	
	public void build(Node node, IBuilderCallback callback) throws CommonException {
		Map<Grid, Node> grids = new HashMap<Grid, Node>();
		NodeIterator bl = getIterator(node, BOARD_XP);
		Node b;
		while ((b = bl.nextNode())!= null) {
			String name = getName(b);
			Board board = new Board();
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
			nl = getIterator(b, POS_XP);
			while ((n = nl.nextNode())!= null) {
				NodeIterator vl = getIterator(n, V_XP);
				Node v;
				while ((v = vl.nextNode())!= null) {
					board.addPosition(getText(v));
				}
			}
			nl = getIterator(b, KILL_XP);
			while ((n = nl.nextNode())!= null) {
				NodeIterator vl = getIterator(n, V_XP);
				Node v;
				while ((v = vl.nextNode())!= null) {
					board.delPosition(getText(v));
				}
			}
			for (Grid g: grids.keySet()) {
				n = grids.get(g);
				NodeIterator vl = getIterator(n, DIR_XP);
				genDirs(g, vl);
			}
			nl = getIterator(b, LINK_XP);
			while ((n = nl.nextNode())!= null) {
				String nm = getName(n);
				List<String> pos = new ArrayList<String>();
				NodeIterator vl = getIterator(n, V_XP);
				Node v;
				while ((v = vl.nextNode())!= null) {
					pos.add(getText(v));
				}
				if (pos.size() != 2) {
					throw new CommonException("Syntax Error");
				}
				board.addLink(nm, pos.get(0), pos.get(1));
			}
			nl = getIterator(b, UNLINK_XP);
			while ((n = nl.nextNode())!= null) {
				String nm = getName(n);
				NodeIterator vl = getIterator(n, V_XP);
				Node v;
				while ((v = vl.nextNode())!= null) {
					board.delLink(nm, getText(v));
				}
			}
			callback.addBoard(name, board);
		}
	}
}
