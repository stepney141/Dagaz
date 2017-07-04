package com.gluk.z2j.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.xpath.XPathAPI;
import org.w3c.dom.Node;
import org.w3c.dom.traversal.NodeIterator;

import com.gluk.z2j.api.loader.IDoc;
import com.gluk.z2j.api.model.IBoard;
import com.gluk.z2j.api.model.IGame;

public class Board extends AbstractDoc implements IBoard {
	
	private final static String BOARD_TAG  = "board";
	private final static String GRID_TAG   = "grid";
	private final static String PLAYER_TAG = "player";
	private final static String POS_TAG    = "pos";
	private final static String NAME_TAG   = "name";
	private final static String DIR_TAG    = "dir";
	private final static String ZONE_TAG   = "zone";
	private final static String A_TAG      = "z2j-a";
	private final static String X_TAG      = "left";
	private final static String Y_TAG      = "top";
	private final static String DX_TAG     = "width";
	private final static String DY_TAG     = "height";
	private final static String IMG_TAG    = "image";
	
	private final static String ALL_XP     = "*";
	private final static String HEAD_XP    = "*[1]";
	private final static String TAIL_XP    = "*[position()>1]";
	private final static String NAME_XP    = "name/*[1]";
	private final static String PLAYER_XP  = "players/*";
	private final static String ZPOS_XP    = "positions/*";
	
	private final static String POS_XP     = "/board/positions/*";
	private final static String DUMMY_XP   = "/board/dummy/*";
	private final static String KILL_XP    = "/board/kill-positions/*";
	private final static String LINK_XP    = "/board/links";
	private final static String UNLINK_XP  = "/board/unlink";
	private final static String SYMS_XP    = "/board/symmetry";
	private final static String ZONE_XP    = "/board/zone";
	private final static String IMG_XP     = "/board/image/z2j-a";

	private List<String> posl  = new ArrayList<String>();
	private List<String> dirl  = new ArrayList<String>();
	private List<String> zonel = new ArrayList<String>();
	
	private Map<String, Rect> poss = new HashMap<String, Rect>();
	private Map<String, Integer> dirs = new HashMap<String, Integer>();
	private Map<String, Map<String, String>> links = new HashMap<String, Map<String, String>>();
	private Map<String, Map<String, String>> syms = new HashMap<String, Map<String, String>>();
	private Map<String, Map<String, List<String>>> zones = new HashMap<String, Map<String, List<String>>>();
	
	private IGame game;
	private Grid proxy  = null;
	
	private int marginX = 0;
	private int marginY = 0;
	private int width   = 0;
	private int height  = 0;
	
	private String img  = "";
	
	public Board(IGame game) {
		this.game = game;
	}
	
	public void setMargins(int x, int y) {
		marginX = x;
		marginY = y;
	}
	
	private String getValue(Node doc, String xp) throws Exception {
		Node n;
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, xp);
		if ((n = nl.nextNode())!= null) {
			String r = n.getLocalName();
			if (r.equals(A_TAG)) {
				r = n.getTextContent();
			}
			return r;
		}
		return "";
	}

	public int getPosition(String pos) {
		Rect r = poss.get(pos);
		if (r == null) {
			return -1;
		}
		return r.offset;
	}

	public int getDirection(String dir) {
		Integer r = dirs.get(dir);
		if (r == null) {
			return -1;
		}
		return r;
	}
	
	public int getZone(String name) {
		for (int i = 0; i < zonel.size(); i++) {
			if (zonel.get(i).equals(name)) return i;
		}
		return -1;
	}

	public void open(String tag) throws Exception {
		if (proxy != null) {
			proxy.open(tag);
			return;
		}
		if (tag.equals(GRID_TAG)) {
			proxy = new Grid(this);
			proxy.open(tag);
			return;
		}
		super.open(tag);
	}

	public boolean close() throws Exception {
		if (proxy != null) {
			boolean r = proxy.close(); 
			if (r) {
				proxy.extract();
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

	private void extractZones(IDoc dest) throws Exception {
		for (String zone: zonel) {
			dest.open(ZONE_TAG);
			dest.open(NAME_TAG); dest.add(zone); dest.close();
			Map<String, List<String>> players = zones.get(zone);
			if (players != null) {
				for (String player: players.keySet()) {
					dest.open(PLAYER_TAG);
					dest.open(NAME_TAG); dest.add(player); dest.close();
					List<String> l = players.get(player);
					if (l != null) {
						for (String pos: l) {
							if (!poss.containsKey(pos)) {
								throw new Exception("Internal error");
							}
							Rect p = poss.get(pos);
							if (p != null) {
								dest.open(POS_TAG); dest.add(Integer.toString(p.offset)); dest.close();
							}
						}
					}
					dest.close();
				}
			}
			dest.close();
		}
	}
	
	public void addZone(String name, String player, String pos)	throws Exception {
		Map<String, List<String>> z = zones.get(name);
		if (z == null) {
			z = new HashMap<String, List<String>>();
			zones.put(name, z);
			zonel.add(name);
		}
		List<String> l = z.get(player);
		if (l == null) {
			l = new ArrayList<String>();
			z.put(player, l);
		}
		if (l.contains(pos)) {
			throw new Exception("Zone [" + name + "] already contains Position [" + pos + "] for Player [" + player + "]");
		}
		l.add(pos);
	}

	public void addZone(String name, String pos) throws Exception {
		for (String player: game.getPlayers()) {
			addZone(name, player, pos);
		}
	}

	private void extractBoard(IDoc dest) throws Exception {
		if (!img.isEmpty()) {
			dest.open(IMG_TAG);dest.add(img);dest.close();
		}
		dest.open(DX_TAG);dest.add(Integer.toString(width + 2 * marginX));dest.close();
		dest.open(DY_TAG);dest.add(Integer.toString(height + 2 * marginY));dest.close();
	}
	
	private void extractDirections(IDoc dest) throws Exception {
		dest.open(DIR_TAG);
		for (String dir: dirl) {
			dest.open(NAME_TAG); dest.add(dir); dest.close();
		}
		dest.close();
	}
	
	private void extractPositions(IDoc dest) throws Exception {
		for (String src: posl) {
			dest.open(POS_TAG);
			dest.open(NAME_TAG); dest.add(src); dest.close();
			if (!poss.containsKey(src)) {
				throw new Exception("Internal error");
			}
			Rect s = poss.get(src);
			if (s != null) {
				dest.open(X_TAG);  dest.add(Integer.toString(s.x));  dest.close();
				dest.open(Y_TAG);  dest.add(Integer.toString(s.y));  dest.close();
				dest.open(DX_TAG); dest.add(Integer.toString(s.dx)); dest.close();
				dest.open(DY_TAG); dest.add(Integer.toString(s.dy)); dest.close();
			}
			for (String dir: dirl) {
				dest.open(DIR_TAG);
				Map<String, String> l = links.get(src);
				if (l != null) {
					String dst = l.get(dir);
					if (dst != null) {
						if (!poss.containsKey(dst)) {
							throw new Exception("Internal error");
						}
						int delta = 0;
						Rect d = poss.get(dst);
						if ((s != null) && (d != null)) {
							delta = d.offset - s.offset;
						}
						dest.add(Integer.toString(delta));
					} else {
						dest.add("0");
					}
				}
				dest.close();
			}
			dest.close();
		}
	}
	
	public void addSym(String player, String from, String to) throws Exception {
		Map<String, String> l = syms.get(player);
		if (l == null) {
			l = new HashMap<String, String>();
			syms.put(player, l);
		}
		if (l.containsKey(from)) {
			throw new Exception("Symmetry [" + from + "] for Player [" + player + "] already exists");
		}
		l.put(from, to);
	}
	
	private Integer getOpposite(String name) {
		for (String d: dirs.keySet()) {
			boolean isOpposite = true;
			for (String src: links.keySet()) {
				Map<String, String> l = links.get(src);
				if (l.containsKey(name)) {
					String dst = l.get(name);
					Map<String, String> b = links.get(dst);
					if ((b == null) || !b.containsKey(d) || !b.get(d).equals(src)) {
						isOpposite = false;
						break;
					}
				}
			}
			if (isOpposite) {
				return dirs.get(d);
			}
		}
		return null;
	}
	
	private void extractOpposite(IDoc dest) throws Exception {
		dest.open(PLAYER_TAG);
		for (String dir: dirl) {
			Integer o = getOpposite(dir);
			dest.open(DIR_TAG);
			if (o != null) {
				dest.add(o.toString());
			}
			dest.close();
		}
		dest.close();
	}
	
	private void extractSyms(IDoc dest) throws Exception {
		boolean f = false;
		for (String player: syms.keySet()) {
			if (f) {
				dest.close();
			} 
			f = true;
			dest.open(PLAYER_TAG);
			dest.open(NAME_TAG);dest.add(player);dest.close();
			Map<String, String> l = syms.get(player);
			int i = 0;
			for (String from: dirl) {
				dest.open(DIR_TAG);
				String to = l.get(from);
				if (to != null) {
					Integer n = dirs.get(to);
					if (n == null) {
						throw new Exception("Internal error");
					}
					dest.add(n.toString());
				} else {
					dest.add(Integer.toString(i++));
				}
				dest.close();
			}
		}
		if (f) {
			dest.close();
		}
	}	

	public void addPos(String name, int x, int y, int dx, int dy) throws Exception {
		if (poss.containsKey(name)) {
			throw new Exception("Position [" + name + "] already exists");
		}
		Rect r = new Rect(poss.size(), x, y, dx, dy);
		poss.put(name, r);
		posl.add(name);
		if (x + dx - marginX > width) {
			width = x + dx - marginX; 
		}
		if (y + dy - marginY > height) {
			height = y + dy - marginY; 
		}
	}

	public void delPos(String name) throws Exception {
		links.remove(name);
		for (Map<String, String> l: links.values()) {
			for (String dir: l.keySet()) {
				String pos = l.get(dir);
				if (pos.equals(name)) {
					l.remove(dir);
					break;
				}
			}
		}
	}

	public void addLink(String name, String from, String to) throws Exception {
		if (!dirs.containsKey(name)) {
			int n = dirs.size();
			dirs.put(name, n);
			dirl.add(name);
		}
		Map<String, String> l = links.get(from);
		if (l == null) {
			l = new HashMap<String, String>();
			links.put(from, l);
		}
		if (l.containsKey(name)) {
			throw new Exception("Link [" + name + "] from Position [" + from + "] already exists");
		}
		l.put(name, to);
	}

	public void delLink(String from, String to) throws Exception {
		Map<String, String> l = links.get(from);
		if (l != null) {
			while (true) {
				boolean f = true;
				for (String name: l.keySet()) {
					if (l.get(name).equals(to)) {
						l.remove(name);
						f = false;
						break;
					}
				}
				if (f) break;
			}
		}
	}

	public void delLink(String from) throws Exception {
		links.remove(from);
	}
	
	private void getPositions() throws Exception {
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, POS_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			int x = 0, y = 0, dx = 0, dy = 0;
			NodeIterator kl = XPathAPI.selectNodeIterator(n, A_TAG);
			Node k = kl.nextNode();
			if (k != null) {
				x = Integer.parseInt(k.getTextContent());
				k = kl.nextNode();
			}
			if (k != null) {
				y = Integer.parseInt(k.getTextContent());
				k = kl.nextNode();
			}
			if (k != null) {
				dx = Integer.parseInt(k.getTextContent()) - x;
				k = kl.nextNode();
			}
			if (k != null) {
				dy = Integer.parseInt(k.getTextContent()) - y;
				addPos(n.getLocalName(), x, y, dx, dy);
			}
		}
		nl = XPathAPI.selectNodeIterator(doc, DUMMY_XP);
		while ((n = nl.nextNode())!= null) {
			addPos(n.getLocalName(), 0, 0, 0, 0);
		}
		nl = XPathAPI.selectNodeIterator(doc, KILL_XP);
		while ((n = nl.nextNode())!= null) {
			delPos(n.getLocalName());
		}
	}
	
	private void getLinks() throws Exception {
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, LINK_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			String name = getValue(n, HEAD_XP);
			NodeIterator tl = XPathAPI.selectNodeIterator(n, TAIL_XP);
			Node t;
			while ((t = tl.nextNode())!= null) {
				String from = t.getLocalName();
				String to = getValue(t, HEAD_XP);
				addLink(name, from, to);
			}
		}
		nl = XPathAPI.selectNodeIterator(doc, UNLINK_XP);
		while ((n = nl.nextNode())!= null) {
			NodeIterator tl = XPathAPI.selectNodeIterator(n, ALL_XP);
			Node t;
			while ((t = tl.nextNode())!= null) {
				String from = t.getLocalName();
				String to = getValue(t, HEAD_XP);
				if (to.isEmpty()) {
					delLink(from);
				} else {
					delLink(from, to);
				}
			}
		}
	}
	
	private void getSyms() throws Exception {
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, SYMS_XP);
		boolean f = true;
		Node n;
		while ((n = nl.nextNode())!= null) {
			f = false;
			String player = getValue(n, HEAD_XP);
			NodeIterator tl = XPathAPI.selectNodeIterator(n, TAIL_XP);
			Node t;
			while ((t = tl.nextNode())!= null) {
				String from = t.getLocalName();
				String to = getValue(t, HEAD_XP);
				addSym(player, from, to);
			}
		}
		if (f) {
			for (String player: game.getPlayers()) {
				if (!f) {
					for (String dir: dirl) {
						addSym(player, dir, dir);
					}
				}
				f = false;
			}
		}
	}
	
	private void getZones() throws Exception {
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, ZONE_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			String name = getValue(n, NAME_XP);
			NodeIterator pl = XPathAPI.selectNodeIterator(n, PLAYER_XP);
			Node p;
			while ((p = pl.nextNode())!= null) {
				String player = p.getLocalName();
				NodeIterator zl = XPathAPI.selectNodeIterator(n, ZPOS_XP);
				Node z;
				while ((z = zl.nextNode())!= null) {
					String pos = z.getLocalName();
					if (pos.equals(A_TAG)) {
						pos = z.getTextContent();
					}
					addZone(name, player, pos);
				}
			}
		}
	}
	
	private void getImg() throws Exception {
		NodeIterator nl = XPathAPI.selectNodeIterator(doc, IMG_XP);
		Node n = nl.nextNode();
		if (n != null) {
			img = n.getTextContent().toLowerCase().replace(".bmp", ".png");
		}
	}
	
	public void extract(IDoc dest) throws Exception {
		getPositions();
		getLinks();
		getSyms();
		getZones();
		getImg();
		dest.open(BOARD_TAG);
		extractBoard(dest);
		extractDirections(dest);
  		extractOpposite(dest);
		extractSyms(dest);
		extractPositions(dest);
		extractZones(dest);
		dest.close();
	}
}
