package com.gluk.dagaz.parser;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.model.IPlayers;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;

public class Build implements IBuild {

	private IPlayers players;
	private IBoard board;
	private String pieceType;
	
	protected List<ICommand> commands = new ArrayList<ICommand>();
	private List<Integer> fixups = new ArrayList<Integer>();
	private Set<String> localNames = new HashSet<String>();
	
	public Build(IPlayers players, IBoard board, String pieceType) {
		this.players = players;
		this.board = board;
		this.pieceType = pieceType;
	}
	
	public Build(IPlayers players, IBoard board) {
		this.board = board;
		this.pieceType = "";
	}
	
	public void addCommand(ICommand command) {
		commands.add(command);
	}

	public int getOffset() {
		return commands.size();
	}

	public IBoard getBoard() {
		return board;
	}

	public void addFixup(int offset) {
		fixups.add(offset);
	}

	public void fixup() throws CommonException {
		int currentOffset = commands.size();
		for (Integer offset: fixups) {
			ICommand c = commands.get(offset);
			c.addArgument(currentOffset - offset);
		}
	}

	public void addLocalName(String name) {
		localNames.add(name);
	}

	public boolean isLocalName(String name) {
		return localNames.contains(name);
	}
	
	public void setDeferred(int offset) {
		for (int ix = offset; ix < commands.size(); ix++) {
			commands.get(ix).setDeferred();
		}
	}

	public int getSize() {
		return commands.size();
	}

	public ICommand getCommand(int ix) throws CommonException {
		if (ix >= commands.size()) {
			throw new CommonException("Command [" + Integer.toString(ix) + "] out of bound [" + Integer.toString(commands.size()) + "]");
		}
		return commands.get(ix);
	}

	public String getPieceType() {
		return pieceType;
	}

	public IPlayers getPlayers() {
		return players;
	}
}
