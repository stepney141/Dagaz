package com.gluk.z2j.model;

import com.gluk.z2j.api.form.IForm;
import com.gluk.z2j.api.form.IMoveParser;
import com.gluk.z2j.api.loader.IDoc;
import com.gluk.z2j.api.model.IGame;
import com.gluk.z2j.api.model.IPiece;
import com.gluk.z2j.form.ApplyForm;
import com.gluk.z2j.form.ModeForm;
import com.gluk.z2j.form.SeqForm;

public class MoveParser implements IDoc, IMoveParser {
	
	private final static String MODE_TAG    = "move-type";
	private final static String FROM_TAG    = "from";
	
	private IGame game;
	private IPiece piece;
	private boolean isDrop;
	
	private String mode = "";
	private IForm  form = null;
	private int    deep = 0;
	
	public MoveParser(IPiece piece, IGame game, boolean isDrop) {
		this.piece  = piece;
		this.game   = game;
		this.isDrop = isDrop;
	}
	
	public IPiece getPiece() {
		return piece;
	}
	
	public String getMode() {
		return mode;
	}
	
	public void setMode(String mode) {
		this.mode = mode;
	}
	
	public boolean isNavigation(String name) {
		return game.isDirection(name) || game.isPosition(name);
	}
	
	public void open(String tag) throws Exception {
		if (deep == 0) {
			deep++;
		} else {
			if (form == null) {
				if (tag.equals(MODE_TAG)) {
					form = new ModeForm(this);
				} else {
					form = new SeqForm(this);
					if (!isDrop) {
						form.addForm(new ApplyForm(FROM_TAG, this));
					}
				}
			}
			form.open(tag);
		}
	}

	public boolean close() throws Exception {
		if (form == null) {
			deep--;
			return (deep == 0);
		}
		if (form.close()) {
			form.addMove(piece, mode, isDrop);
			form = null;
		}
		return false;
	}

	public void add(String s) throws Exception {
		if (form == null) {
			throw new Exception("Invalid move section");
		}
		form.add(s);
	}
}
