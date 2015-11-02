package com.gluk.dagaz.model;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.random.IRandomGenerator;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.random.RandomFactory;

public class Piece implements IPiece {
	
	private final static String ZOBRIST_RAND = "$$$ZOBRIST$$$";
	private static Map<Piece, Map<String, Long>> hashes = new HashMap<Piece, Map<String, Long>>();
	
	private String type;
	private String owner;
	private Map<String, IValue> attributes = new HashMap<String, IValue>();
	
	public static long getHash(Piece piece, String pos) {
		Map<String, Long> h = hashes.get(piece);
		if (h == null) {
			h = new HashMap<String, Long>();
			hashes.put(piece, h);
		}
		Long r = h.get(pos);
		if (r == null) {
			IRandomGenerator g = RandomFactory.getInstance().getGenerator(ZOBRIST_RAND);
			r = g.getLongValue();
			h.put(pos, r);
		}
		return r;
	}
	
	public boolean equals(Piece p) {
		return this == p;
	}
	
	public int hashCode() {
		return super.hashCode();
	}

	public Piece(String name, String owner) {
		this.type = name;
		this.owner = owner;
	}

	public String getName() {
		return type;
	}

	public String getOwner() {
		return owner;
	}

	public long getHash(String pos) {
		return getHash(this, pos);
	}
	
	public IValue getAttribute(String attr, IValue def) throws CommonException {
		IValue r = attributes.get(attr);
		if (r == null) {
			return def;
		}
		return r;
	}

	public void addAttribute(String attr, IValue value) throws CommonException {
		attributes.put(attr, value);
	}
	
	public IPiece setAttribute(String attr, IValue value) throws CommonException {
		IPiece p = new Piece(type, owner);
		for (String n: attributes.keySet()) {
			p.addAttribute(n, attributes.get(n));
		}
		p.addAttribute(attr, value);
		return p;
	}
}
