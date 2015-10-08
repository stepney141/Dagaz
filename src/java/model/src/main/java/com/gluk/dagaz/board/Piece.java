package com.gluk.dagaz.board;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.model.IPiece;
import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.random.IRandomGenerator;
import com.gluk.dagaz.api.state.ITransactional;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Application;

public class Piece implements IPiece, ITransactional {
	
	private final static String ZOBRIST_RAND = "$$$ZOBRIST$$$";
	private static Map<String, Map<String, Long>> hashes = new HashMap<String, Map<String, Long>>();
	
	private String name;
	private String owner;
	private Map<String, IValue> attributes = new HashMap<String, IValue>();
	
	public static long getHash(String piece, String pos) {
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
		return getHash(name, pos);
	}

	public IValue getAttribute(String name) throws CommonException {
		// TODO Auto-generated method stub
		return null;
	}

	public void setAttribute(String name, IValue value) throws CommonException {
		// TODO Auto-generated method stub
		
	}

	public void savepoint() {
		// TODO Auto-generated method stub
		
	}

	public void rollback() throws CommonException {
		// TODO Auto-generated method stub
		
	}
}
