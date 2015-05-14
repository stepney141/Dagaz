package com.gluk.dagaz.state;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.CriticalException;
import com.gluk.dagaz.api.state.IPieceIterator;
import com.gluk.dagaz.api.state.IPiecePosition;

public class PieceList {
	
	private State state;
	private List<PiecePosition> pieces = new ArrayList<PiecePosition>();
	
	public PieceList(State state) {
		this.state = state;
	}
	
	public IPieceIterator getIterator() {
		return new PieceIterator(this);
	}
	
	public void addPiece(String pos, boolean isCut) throws CommonException {
		state.takePiece(this, pos, isCut);
	}
	
	public void add(PiecePosition p) throws CommonException {
		for (int i = 0; i < pieces.size(); i++) {
			if (p.isEqual(pieces.get(i))) {
				throw new CriticalException("Duplicate position in list");
			}
		}
		pieces.add(p);
	}
	
	public IPiecePosition getPiece(int ix) {
		return pieces.get(ix);
	}
	
	public Collection<PiecePosition> getPieces() {
		return pieces;
	}
	
	public void setAttribute(String pos, String name, String value) {
		for (PiecePosition pp: pieces) {
			if (pos.equals(pp.getPosition())) {
				pp.setAttribute(name, value);
			}
		}
	}
}
