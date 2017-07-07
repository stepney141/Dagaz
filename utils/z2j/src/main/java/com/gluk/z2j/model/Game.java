package com.gluk.z2j.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.xpath.XPathAPI;
import org.w3c.dom.Node;
import org.w3c.dom.traversal.NodeIterator;

import com.gluk.z2j.api.form.IConst;
import com.gluk.z2j.api.form.IForm;
import com.gluk.z2j.api.loader.IDoc;
import com.gluk.z2j.api.model.IGame;

public class Game extends AbstractDoc implements IGame {
	
	private final static String    GAME_TAG  = "game";
	private final static String   TITLE_TAG  = "title";
	private final static String    GOAL_TAG  = "goal";
	private final static String     WIN_TAG  = "win";
	private final static String    BOARD_TAG = "board";
	private final static String      POS_TAG = "pos";
	private final static String  RESERVE_TAG = "reserve";
	private final static String  PLAYERS_TAG = "players";
	private final static String   REPEAT_TAG = "repeat";
	private final static String    TURNS_TAG = "turn";
	private final static String   PLAYER_TAG = "player";
	private final static String      IMG_TAG = "image";
	private final static String      RES_TAG = "res";
	private final static String   OPTION_TAG = "option";
	private final static String    PIECE_TAG = "piece";
	private final static String     MODE_TAG = "mode";
	private final static String     NAME_TAG = "name";
	private final static String    VALUE_TAG = "value";
	private final static String    PRIOR_TAG = "is_mandatory";
	private final static String    SETUP_TAG = "board-setup";
	private final static String      OFF_TAG = "off";
	private final static String     MOVE_TAG = "move";
	private final static String     DROP_TAG = "drop";
	private final static String TEMPLATE_TAG = "template";
	private final static String    PARAM_TAG = "param";
	private final static String     ATTR_TAG = "attr";
 	private final static String      CMD_TAG = "c";
 	private final static String        D_TAG = "d";
 	private final static String        I_TAG = "i";
 	private final static String        P_TAG = "p";
 	private final static String        N_TAG = "n";
	private final static String        A_TAG = "z2j-a";

	private final static String   TITLE_XP   = "/game/title/*[1]";
	private final static String PLAYERS_XP   = "/game/players/*";
	private final static String   TURNS_XP   = "/game/turn-order/*";
	private final static String  PRIORS_XP   = "/game/move-priorities/*";
	private final static String   MODES_XP   = "/game/piece/*/move-type/*";
	private final static String   ATTRS_XP   = "/game/piece/attribute/*[1]";
	private final static String  PIECES_XP   = "/game/piece";
	private final static String PIECENM_XP   = "/game/piece/name/*";
	private final static String   SETUP_XP   = "/game/board-setup/*";
	private final static String  OPTION_XP   = "/game/option";
	private final static String     WIN_XP   = "/game/win-condition";
	private final static String     ABS_XP   = "and/absolute-config | absolute-config";
	private final static String     IMG_XP   = "image/*";
	private final static String    ATTR_XP   = "attribute";
	private final static String   FIRST_XP   = "*[1]";
	private final static String  SECOND_XP   = "*[2]";
	
	private final static String       A_XP   = "z2j-a";
	private final static String     ALL_XP   = "*";
	
	private AbstractDoc               proxy  = null;
	private Map<String, Integer>    players  = new HashMap<String, Integer>();
	private List<String>             pnames  = new ArrayList<String>();
	private List<String>              modes  = new ArrayList<String>();
	private List<MoveTemplate>    templates  = new ArrayList<MoveTemplate>();
	private Map<Integer, List<Move>>  moves  = new HashMap<Integer, List<Move>>();
	private Map<String, Integer>      names  = new HashMap<String, Integer>();
	private Map<String, Integer>      attrs  = new HashMap<String, Integer>();
	private List<String>             pieces  = new ArrayList<String>();
	
	private int flags;
	private int priorities = 0;
	private Board board = null;
	private String name;
	
	public Game(String name) {
		int pos = name.indexOf('.');
		if (pos >= 0) {
			this.name = name.substring(0, pos);
		} else {
			this.name = name;
		}
	}

	private String getValue(Node doc, String xp) throws Exception {
		Node n;
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, xp);
		if ((n = nl.nextNode())!= null) {
			String r = n.getLocalName();
			if (r.equals(A_XP)) {
				r = n.getTextContent();
			}
			return r;
		}
		return "";
	}

	public Collection<String> getPlayers() {
		return pnames;
	}

	public boolean isPlayer(String name) {
		return players.containsKey(name);
	}

	public boolean isAttribute(String name) {
		return attrs.containsKey(name);
	}

	public boolean isMode(String name) {
		return modes.contains(name);
	}

	public boolean isPiece(String name) {
		return pieces.contains(name);
	}

	public boolean isPosition(String name) {
		if (board != null) {
			return (board.getPosition(name) >= 0);
		}
		return false;
	}

	public boolean isDirection(String name) {
		if (board != null) {
			return (board.getDirection(name) >= 0);
		}
		return false;
	}

	public boolean isZone(String name) {
		if (board != null) {
			return (board.getZone(name) >= 0);
		}
		return false;
	}

	public int getNameIndex(String name) {
		if (isPiece(name)) {
			return pieces.indexOf(name);
		}
		if (isPosition(name)) {
			return board.getPosition(name);
		}
		if (isDirection(name)) {
			return board.getDirection(name);
		}
		if (isZone(name)) {
			return board.getZone(name);
		}
		if (isAttribute(name)) {
			return attrs.get(name);
		}
		if (isPlayer(name)) {
			return players.get(name);
		}
		if (isMode(name)) {
			return modes.indexOf(name);
		}
		Integer r = names.get(name);
		if (r == null) {
			r = names.size();
			names.put(name, r);
		}
		return r;
	}

	public boolean checkFlag(int flag) {
		return (flag & flags) != 0;
	}

	public void setFlag(int flag, int value) {
		if (value != 0) {
			flags |= flag;
		} else {
			flags &= ~flag;
		}
	}

	public void open(String tag) throws Exception {
		if (proxy != null) {
			proxy.open(tag);
			return;
		}
		if (tag.equals(BOARD_TAG)) {
			if (board != null) {
				throw new Exception("Board redefined");
			}
			board = new Board(this);
			proxy = board;
			proxy.open(tag);
			return;
		}
		super.open(tag);
	}

	public boolean close() throws Exception {
		if (proxy != null) {
			boolean r = proxy.close(); 
			if (r) {
				proxy = null;
			}
			return false;
		}
		return super.close();
	}

	public void add(String s) throws Exception {
		if (proxy != null) {
			proxy.add(s);
		} else {
			super.add(s);
		}
	}

	private int addTemplate(MoveTemplate template) {
		for (int i = templates.size() - 1; i >= 0; i--) {
			if (template.isEqual(templates.get(i))) {
				return i;
			}
		}
		templates.add(template);
		return templates.size() - 1;
	}
	
	public int addMode(String mode) {
		for (int i = 0; i < modes.size(); i++) {
			if (modes.get(i).equals(mode)) {
				return i;
			}
		}
		modes.add(mode);
		return modes.size() - 1;
	}
	
	public void addMove(int piece, IForm form, String mode, boolean isDrop) throws Exception {
		flags = 0;
		List<Integer> params = new ArrayList<Integer>();
		MoveTemplate template = new MoveTemplate();
		form.generate(template, params, this, IForm.NO_HINT);
		template.addCommand(IConst.ZRF_FUNCTION, IConst.ZRF_END, "end", "FUNCTION");
		int tx = addTemplate(template);
		int mx = addMode(mode);
		List<Move> ml = moves.get(piece);
		if (ml == null) {
			ml = new ArrayList<Move>();
			moves.put(piece, ml);
		}
		ml.add(new Move(tx, params, mx, isDrop));
	}
	
	private void extractPlayers(IDoc dest) throws Exception {
		dest.open(PLAYERS_TAG);
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, PLAYERS_XP);
		Node n;
		for (int i = 0; (n = nl.nextNode())!= null; i++) {
			players.put(n.getLocalName(), i + 1);
			pnames.add(n.getLocalName());
			dest.open(NAME_TAG);dest.add(n.getLocalName()); dest.close();
		}
		dest.close();
		nl = XPathAPI.selectNodeIterator(doc, TURNS_XP);
		while ((n = nl.nextNode())!= null) {
			if (n.getLocalName().equals(REPEAT_TAG)) {
				dest.open(TURNS_TAG);
				dest.open(REPEAT_TAG); dest.close();
				dest.close();
				continue;
			}
			Integer player = players.get(n.getLocalName());
			if (player != null) {
				dest.open(TURNS_TAG);
				dest.open(PLAYER_TAG);dest.add(player.toString()); dest.close();
				NodeIterator kl = XPathAPI.selectNodeIterator(n, ALL_XP);
				Node k;
				while ((k = kl.nextNode())!= null) {
					String name = k.getLocalName();
					Integer mode = addMode(name);
					dest.open(MODE_TAG);dest.add(mode.toString()); dest.close();
				}
				dest.close();
			}
		}
	}
	
	private void extractOptions(IDoc dest) throws Exception {
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, OPTION_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			String name  = getValue(n, FIRST_XP).trim().replace(' ', '-');
			String value = getValue(n, SECOND_XP);
			if ((name != null) && (value != null)) {
				dest.open(OPTION_TAG);
				dest.open(NAME_TAG);dest.add(name); dest.close();
				dest.open(VALUE_TAG);dest.add(value); dest.close();
				dest.close();
			}
		}
	}
	
	private void extractModes(IDoc dest) throws Exception {
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, PRIORS_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			addMode(n.getLocalName());
		}
		priorities = modes.size();
		nl = XPathAPI.selectNodeIterator(doc, MODES_XP);
		while ((n = nl.nextNode())!= null) {
			addMode(n.getLocalName());
		}
		for (int i = 0; i < modes.size(); i++) {
			dest.open(MODE_TAG);
			dest.open(NAME_TAG); dest.add(modes.get(i)); dest.close();
			if (i < priorities) {
				dest.open(PRIOR_TAG); dest.close();
			}
			dest.close();
		}
	}
	
	private void extractTiltle(IDoc dest) throws Exception {
		dest.open(NAME_TAG);dest.add(name);dest.close();
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, TITLE_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			String value = n.getLocalName();
			if (value.equals(A_TAG)) {
				value = n.getTextContent();
			}
			dest.open(TITLE_TAG);dest.add(value);dest.close();
		}
	}
	
	private void extractSetup(IDoc dest) throws Exception {
		boolean f = false;
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, SETUP_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			if (!f) {
				dest.open(SETUP_TAG);
				f = true;
			}
			dest.open(n.getLocalName());
			NodeIterator al = XPathAPI.selectNodeIterator(n, ALL_XP);
			Node a;
			while ((a = al.nextNode())!= null) {
				dest.open(a.getLocalName());
				NodeIterator pl = XPathAPI.selectNodeIterator(a, ALL_XP);
				Node p;
				while ((p = pl.nextNode())!= null) {
					String pos = p.getLocalName();
					if (pos.equals(A_TAG)) {
						pos = p.getTextContent();
					}
					if (pos.equals(OFF_TAG)) {
						p = pl.nextNode();
						if (p != null) {
							String t = p.getTextContent();
							if (!t.isEmpty()) {
								dest.open(RESERVE_TAG); dest.add(t); dest.close();
							}
						}
						continue;
					}
					Integer ix = getNameIndex(pos);
					dest.open(POS_TAG); dest.add(ix.toString()); dest.close();
				}
				dest.close();
			}
			dest.close();
		}
		if (f) {
			dest.close();
		}
	}
	
	private void extractAttrs() throws Exception {
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, ATTRS_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			String name = n.getLocalName();
			Integer r = attrs.get(name);
			if (r == null) {
				r = attrs.size();
				attrs.put(name, r);
			}
		}
	}
	
	private void extractImages(IDoc dest, Node doc) throws Exception {
		String player = "";
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, IMG_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			String t = n.getLocalName();
			if (t.equals(A_XP)) {
				if (!player.isEmpty()) {
					dest.open(IMG_TAG);
					dest.open(PLAYER_TAG); dest.add(player); dest.close();
					dest.open(RES_TAG); dest.add(n.getTextContent().toLowerCase().replace(".bmp", ".png")); dest.close();
					dest.close();
					player = "";
				}
			} else {
				player = t;
			}
		}
	}

	private void extractPieces(IDoc dest) throws Exception {
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, PIECENM_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			String name = n.getLocalName();
			pieces.add(name);
		}
		nl = XPathAPI.selectNodeIterator(doc, PIECES_XP);
		for (int i = 0; (n = nl.nextNode())!= null; i++) {
			Piece p = new Piece(this, i);
			p.open(PIECE_TAG);
			extract(p, n);
			p.close();
			dest.open(PIECE_TAG);
			extractImages(dest, n);
			NodeIterator kl = XPathAPI.selectNodeIterator(n, ATTR_XP);
			Node k;
			while ((k = kl.nextNode())!= null) {
				dest.open(ATTR_TAG);
				String name = getValue(k, FIRST_XP);
				String value = getValue(k, SECOND_XP);
				Integer ix = getNameIndex(name);
				dest.open(NAME_TAG); dest.add(Integer.toString(ix)); dest.close();
				dest.open(VALUE_TAG); dest.add(value); dest.close();
				dest.close();
			}
			p.extract(dest);
			List<Move> ml = moves.get(p.getIx());
			if (ml != null) {
				for (Move m: ml) {
					if (m.isDrop()) {
						dest.open(DROP_TAG);
					} else {
						dest.open(MOVE_TAG);
					}
					dest.open(MODE_TAG); dest.add(m.getMode().toString()); dest.close();
					dest.open(TEMPLATE_TAG); dest.add(m.getTemplate().toString()); dest.close();
					for (Integer v: m.getParams()) {
						dest.open(PARAM_TAG); dest.add(v.toString()); dest.close();
					}
					dest.close();
				}
			}
			dest.close();
		}
	}
	
	private void extractTemplates(IDoc dest) throws Exception {
		Integer ix = 0;
		for (MoveTemplate t: templates) {
			dest.open(TEMPLATE_TAG);
			for (Command c: t.getCommands()) {
				dest.open(CMD_TAG);
				dest.open(D_TAG); dest.add(c.getDesc()); dest.close();
				dest.open(I_TAG); dest.add(c.getCode().toString()); dest.close();
				dest.open(P_TAG); dest.add(c.getParam().toString()); dest.close();
				dest.open(N_TAG); dest.add(c.getName()); dest.close();
				dest.close();
			}
			dest.close();
			ix++;
		}
	}
	
	private void extractGoals(IDoc dest) throws Exception {
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, WIN_XP);
		Node n;
		for (int i = 0; (n = nl.nextNode())!= null; i++) {
			dest.open(GOAL_TAG);
			dest.open(N_TAG); dest.add(Integer.toString(i)); dest.close();
			NodeIterator kl = XPathAPI.selectNodeIterator(n, FIRST_XP);
			Node k = kl.nextNode();
			if (k != null) {
				dest.open(PLAYER_TAG); dest.add(k.getLocalName());  dest.close();
			}
			kl = XPathAPI.selectNodeIterator(n, ABS_XP);
			while ((k = kl.nextNode())!= null) {
				dest.open(WIN_TAG);
				NodeIterator ml = XPathAPI.selectNodeIterator(k, FIRST_XP);
				Node m = ml.nextNode();
				if (m != null) {
					dest.open(PIECE_TAG); dest.add(m.getLocalName());  dest.close();
					ml = XPathAPI.selectNodeIterator(k, SECOND_XP);
					m = ml.nextNode();
					if (m != null) {
						Integer pos = getNameIndex(m.getLocalName());
						dest.open(POS_TAG); dest.add(Integer.toString(pos));  dest.close();
						NodeIterator ol = XPathAPI.selectNodeIterator(m, ALL_XP);
						Node o;
						while ((o = ol.nextNode())!= null) {
							pos = getNameIndex(o.getLocalName());
							dest.open(POS_TAG); dest.add(Integer.toString(pos));  dest.close();
						}
					}
				}
				dest.close();
			}
			dest.close();
		}
	}
	
	public void extract(IDoc dest) throws Exception {
		dest.open(GAME_TAG);
		if (board == null) {
			throw new Exception("Board undefined");
		}
		extractTiltle(dest);
		extractOptions(dest);
		extractModes(dest);
		extractPlayers(dest);
		board.extract(dest);
		extractAttrs();
		extractPieces(dest);
		extractTemplates(dest);
		extractSetup(dest);
		extractGoals(dest);
		dest.close();
	}
}
