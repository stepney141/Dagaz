package com.gluk.dagaz.state;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.CriticalException;
import com.gluk.dagaz.api.exceptions.EmptyPositionException;
import com.gluk.dagaz.api.state.IPiece;

public class PieceList {
	
	private List<PiecePosition> pieces = new ArrayList<PiecePosition>();
	
	// TODO: PieceIterator не инвалидирующийся при добавлении фигуры в набор
	public void add(PiecePosition p) throws CommonException {
		for (int i = 0; i < pieces.size(); i++) {
			if (p.isEqual(pieces.get(i))) {
				throw new CriticalException("Duplicate position in list");
			}
		}
		pieces.add(p);
	}
	
	public Collection<PiecePosition> getPieces() {
		return pieces;
	}
	
	public void setAttribute(String pos, String name, String value) throws EmptyPositionException {
		for (PiecePosition pp: pieces) {
			if (pos.equals(pp.getPosition())) {
				IPiece p = pp.getPiece();
				if (!p.isValuePresent(name) || 
					!p.isPersistent(name) ||
					!p.getValue(name).equals(value)) {
					p = new Piece(p);
					p.setValue(name, value, true);
					pp.setPiece(p);
				}
			}
		}
	}
}
