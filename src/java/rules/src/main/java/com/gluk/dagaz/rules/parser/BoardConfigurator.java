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

	private final static String BOARD_XP      = "n[@t=\'board\']";
	private final static String GRID_XP       = "n[@t=\'grid\']";
	private final static String DIMS_XP       = "n[@t=\'dimensions\']/s";
	private final static String POS_XP        = "n[@t=\'positions\']/n";
	private final static String KILL_XP       = "n[@t=\'kill-positions\']/n";
	private final static String DIRS_XP       = "n[@t=\'direction\']";
	private final static String VALS_XP       = "v";
	private final static String LINK_XP       = "n[@t=\'link\']";
	private final static String ZONE_XP       = "n[@t=\'zone\']";
	private final static String NONAME_XP     = "n[@t!=\'name\']/n";
	private final static String NOPLAYERS_XP  = "n[@t!=\'players\']/n";
	private final static String PLAYERS_XP    = "n[@t=\'players\']/n";
	private final static String SYN_XP        = "n[@t=\'synonym\']|n[@t=\'gate\']";
	private final static String SYM_XP        = "n[@t=\'symmetry\']";
	private final static String TAGS_XP       = "n";
	private final static String CNT_XP        = "n[@t=\'attribute\']";
	
	private final static String GATE_STR      = "gate";
	private final static String NAME_STR      = "name";
	private final static String PLAYERS_STR   = "players";
	
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
	        g.generate(board);
    		grids.add(g);
        }
	}
	
	public void addPositions(IBoardConfiguration board, Node conf) throws Exception {
		NodeIterator nl = getIterator(conf, POS_XP);
		Node n;
        while ((n = nl.nextNode())!= null) {
        	String position = getName(n);
        	board.addPosition(position);
        }
	}

	public void killPositions(IBoardConfiguration board, Node conf) throws Exception {
		NodeIterator nl = getIterator(conf, KILL_XP);
		Node n;
        while ((n = nl.nextNode())!= null) {
        	String position = getName(n);
        	board.delPosition(position);
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
            	String name = getListName(d);
        		NodeIterator vl = getIterator(d, VALS_XP);
        		Node v;
                while ((v = vl.nextNode())!= null) {
                    g.addDirection(name, Integer.parseInt(v.getTextContent()));
                }
            }
        }
	}

	public void addLinks(IBoardConfiguration board, Node conf) throws Exception {
		NodeIterator nl = getIterator(conf, LINK_XP);
		Node n;
        while ((n = nl.nextNode())!= null) {
        	String name = getListName(n);
    		NodeIterator pl = getIterator(n, NONAME_XP);
    		Node p;
            while ((p = pl.nextNode())!= null) {
            	String startPosition = getName(p);
            	String endPosition = getValue(p);
            	board.addLink(name, startPosition, endPosition);
            }
        }
	}
	
	public void addZones(IBoardConfiguration board, Node conf) throws Exception {
		NodeIterator nl = getIterator(conf, ZONE_XP);
		Node n;
        while ((n = nl.nextNode())!= null) {
        	String name = getListName(n);
    		NodeIterator pl = getIterator(n, PLAYERS_XP);
    		boolean f = true;
    		Node p;
            while ((p = pl.nextNode())!= null) {
            	String player = getName(p);
        		NodeIterator ql = getIterator(n, POS_XP);
        		Node q;
                while ((q = ql.nextNode())!= null) {
                	String position = getName(q);
                	board.addZone(name, position, player);
                }
                f = false;
            }
            if (f) {
        		NodeIterator ql = getIterator(n, POS_XP);
        		Node q;
                while ((q = ql.nextNode())!= null) {
                	String position = getName(q);
                	board.addZone(name, position);
                }
            }
        }
	}
	
	public void addSyns(IBoardConfiguration board, Node conf) throws Exception {
		NodeIterator nl = getIterator(conf, SYN_XP);
		Node n;
        while ((n = nl.nextNode())!= null) {
        	String name = getName(n);
    		NodeIterator pl = getIterator(n, PLAYERS_XP);
    		boolean f = true;
    		Node p;
            while ((p = pl.nextNode())!= null) {
            	String player = getName(p);
        		NodeIterator ql = getIterator(n, NONAME_XP);
        		Node q;
                while ((q = ql.nextNode())!= null) {
                	String oldPosition = getName(q);
                	String newPosition = getValue(q);
                	board.addSynonym(oldPosition, newPosition, player, name.equals(GATE_STR));
                }
                f = false;
            }
            if (f) {
        		NodeIterator ql = getIterator(n, NONAME_XP);
        		Node q;
                while ((q = ql.nextNode())!= null) {
                	String oldPosition = getName(q);
                	String newPosition = getValue(q);
                	board.addSynonym(oldPosition, newPosition, name.equals(GATE_STR));
                }
            }
        }
	}
	
	public void addSymmetries(IBoardConfiguration board, Node conf) throws Exception {
		NodeIterator nl = getIterator(conf, SYM_XP);
		Node n;
        while ((n = nl.nextNode())!= null) {
        	List<String> players = new ArrayList<String>();
    		NodeIterator pl = getIterator(n, PLAYERS_XP);
    		Node p;
            while ((p = pl.nextNode())!= null) {
            	players.add(getName(p));
            }
            if (players.isEmpty()) {
            	throw new ParsingException("Players list is empty");
            }
    		NodeIterator ql = getIterator(n, NOPLAYERS_XP);
    		Node q; int ix = 0;
            while ((q = ql.nextNode())!= null) {
            	if (ix >= players.size()) {
                	throw new ParsingException("Bad Players list");
            	}
            	String player = players.get(ix++);
            	String oldDirection = getName(q);
        		NodeIterator tl = getIterator(q, TAGS_XP);
        		Node t;
                while ((t = tl.nextNode())!= null) {
                	String newDirection = getName(t);
                	board.addSymmetry(oldDirection, newDirection, player);
                }
            }
        }
	}
	
	public void addVariables(IBoardConfiguration board, Node conf) throws Exception {
		NodeIterator nl = getIterator(conf, CNT_XP);
		Node n;
        while ((n = nl.nextNode())!= null) {
        	String name = getListName(n);
    		boolean f = true;
    		NodeIterator pl = getIterator(n, PLAYERS_XP);
    		Node p;
            while ((p = pl.nextNode())!= null) {
            	String player = getName(p);
        		NodeIterator vl = getIterator(n, VALS_XP);
        		Node v;
                while ((v = vl.nextNode())!= null) {
                	String value = v.getTextContent();
                	board.addVariable(name, value, player);
                }
            }
            if (f) {
        		NodeIterator vl = getIterator(n, VALS_XP);
        		Node v;
                while ((v = vl.nextNode())!= null) {
                	String value = v.getTextContent();
                	board.addVariable(name, value);
                }
            }
        }
	}	
	
	public void initBoard(IBoardConfiguration board, Node game) throws CommonException {
		try {
			NodeIterator nl = getIterator(game, BOARD_XP);
			Node n;
	        if ((n = nl.nextNode())!= null) {
	        	addDimensions(board, n);
	        	addPositions(board, n);
	        	killPositions(board, n);
	        	addDirections(board, n);
	        	addSymmetries(board, n);
	        	addLinks(board, n);
	        	addZones(board, n);
	        	addSyns(board, n);
	        	addVariables(board, n);
	        }
		} catch (Exception e) {
			throw new ParsingException(e.toString(), e);
		}
	}
}
