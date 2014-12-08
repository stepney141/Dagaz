package com.gluk.dagaz.rules.parser;

import java.util.ArrayList;
import java.util.List;

import org.w3c.dom.Node;
import org.w3c.dom.traversal.NodeIterator;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.CriticalException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.board.IBoardConfiguration;
import com.gluk.dagaz.api.rules.board.IGrid;
import com.gluk.dagaz.rules.board.Grid;

public class BoardConfigurator extends BaseConfigurator {

	private final static String BOARD_XP  = "n[@t='board']";
	private final static String GRID_XP   = "n[@t='grid']";
	private final static String DIMS_XP   = "n[@t='dimensions']/s";
	private final static String POS_XP    = "n[@t='positions']/n";
	private final static String KILL_XP   = "n[@t='kill-positions']/n";
	private final static String DIRS_XP   = "n[@t='direction']";
	private final static String VALS_XP   = "v";
	
	private List<IGrid> grids = new ArrayList<IGrid>();

	public void addDimensions(IBoardConfiguration board, Node conf) throws Exception {
		NodeIterator nl = getIterator(conf, GRID_XP);
		Node n;
        while ((n = nl.nextNode())!= null) {
        	IGrid g = new Grid(board);
    		NodeIterator dl = getIterator(n, DIMS_XP);
			Node d;
	        if ((d = dl.nextNode())!= null) {
	        	String dim = d.getTextContent();
	        	g.addDimension(dim);
	        }
	        g.generate();
    		grids.add(g);
        }
	}
	
	public void addPositions(IBoardConfiguration board, Node conf) throws Exception {
		NodeIterator nl = getIterator(conf, POS_XP);
		Node n;
        while ((n = nl.nextNode())!= null) {
        	String position = getName(n);
        	board.createPosition(position);
        }
	}

	public void killPositions(IBoardConfiguration board, Node conf) throws Exception {
		NodeIterator nl = getIterator(conf, KILL_XP);
		Node n;
        while ((n = nl.nextNode())!= null) {
        	String position = getName(n);
        	board.deletePosition(position);
        }
	}
	
	public void addDirections(IBoardConfiguration board, Node conf) throws Exception {
		NodeIterator nl = getIterator(conf, GRID_XP);
		Node n; int i = 0;
        while ((n = nl.nextNode())!= null) {
        	if (i >= grids.size()) {
        		throw new CriticalException("Internal Error");
        	}
        	IGrid g = grids.get(i++);
    		NodeIterator dl = getIterator(n, DIRS_XP);
    		Node d;
            while ((d = dl.nextNode())!= null) {
            	List<Integer> deltas = new ArrayList<Integer>();
            	String name = getListName(d);
        		NodeIterator vl = getIterator(d, VALS_XP);
        		Node v;
                while ((v = vl.nextNode())!= null) {
                	deltas.add(Integer.parseInt(v.getTextContent()));
                }
                g.addDirection(name, deltas);
            }
        }
	}
	
	public void initBoard(IBoardConfiguration board, Node conf) throws CommonException {
		try {
			NodeIterator nl = getIterator(conf, BOARD_XP);
			Node n;
	        if ((n = nl.nextNode())!= null) {
	        	addDimensions(board, n);
	        	addPositions(board, n);
	        	killPositions(board, n);
	        	addDirections(board, n);

	        }
		} catch (Exception e) {
			throw new ParsingException(e.toString(), e);
		}
	}
}
