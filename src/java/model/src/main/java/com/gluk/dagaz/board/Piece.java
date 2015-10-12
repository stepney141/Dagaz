package com.gluk.dagaz.board;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.random.IRandomGenerator;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Application;

public class Piece implements IPiece {
	
	private final static String ZOBRIST_RAND = "$$$ZOBRIST$$$";
	private static Map<Piece, Map<String, Long>> hashes = new HashMap<Piece, Map<String, Long>>();
	
	private String name;
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
			IRandomGenerator g = Application.getInstance().getRandomFactory().getGenerator(ZOBRIST_RAND);
			r = g.getLongValue();
			h.put(pos, r);
		}
		return r;
	}

	public Piece(String name, String owner) {
		this.name = name;
		this.owner = owner;
	}

	public String getName() {
		return name;
	}

	public String getOwner() {
		return owner;
	}

	public long getHash(String pos) {
		return getHash(this, pos);
	}
	
	public IValue getAttribute(String name) throws CommonException {
		IValue r = attributes.get(name);
		if (r == null) {
			throw new CommonException("Attribute [" + name + "] not found");
		}
		return r;
	}

	public void addAttribute(String name, IValue value) throws CommonException {
		if (attributes.containsKey(name)) {
			throw new CommonException("Attribute [" + name + "] already defined");
		}
		attributes.put(name, value);
	}
	
	public IPiece setAttribute(String name, IValue value) throws CommonException {
		IPiece p = new Piece(name, owner);
		for (String n: attributes.keySet()) {
			if (!n.equals(name)) {
				p.addAttribute(n, attributes.get(n));
			}
		}
		p.addAttribute(name, value);
		return p;
	}
}
