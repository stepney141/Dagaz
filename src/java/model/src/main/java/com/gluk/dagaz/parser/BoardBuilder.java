package com.gluk.dagaz.parser;

import java.util.ArrayList;
import java.util.List;

import org.w3c.dom.Node;
import org.w3c.dom.traversal.NodeIterator;

import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.parser.IBuilderCallback;
import com.gluk.dagaz.board.Board;
import com.gluk.dagaz.board.Grid;
import com.gluk.dagaz.exceptions.CommonException;

// TODO: Добавить поддержку нескольких grid-ов (сохранить возможность определения одиночного grid-а без использования тега grid)

public class BoardBuilder extends AbstractBuilder {

	public void build(Node node, IBuilderCallback callback) throws CommonException {
		NodeIterator bl = getIterator(node, BOARD_XP);
		Node b;
		while ((b = bl.nextNode())!= null) {
			String name = getName(b);
			IBoard board = new Board();
			Grid g = null;
			NodeIterator nl = getIterator(b, DIM_XP);
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
			if (g != null) {
				g.createPositions();
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
			if (g != null) {
				nl = getIterator(b, DIR_XP);
				while ((n = nl.nextNode())!= null) {
					String dir = getName(n);
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
					g.addDirection(dir, deltas);
				}
			}
			// TODO: link и unlink-тэги

			callback.addBoard(name, board);
		}
	}
}
