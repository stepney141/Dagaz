package com.gluk.dagaz.parser;

import org.w3c.dom.Node;
import org.w3c.dom.traversal.NodeIterator;

import com.gluk.dagaz.api.model.IPlayers;
import com.gluk.dagaz.api.parser.IBuilderCallback;
import com.gluk.dagaz.api.state.IPiece;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.model.Board;
import com.gluk.dagaz.model.Game;
import com.gluk.dagaz.model.Piece;

public class GameBulder extends AbstractBuilder {

	public void build(Node node, IBuilderCallback callback) throws CommonException {
		NodeIterator gl = getIterator(node, GAME_XP);
		Node g;
		while ((g = gl.nextNode())!= null) {
			String name = getName(g);
			Board board = callback.getBoard(getBoard(g));
			Game game = new Game(board);
			NodeIterator nl = getIterator(node, SETUP_XP);
			Node n;
			if ((n = nl.nextNode())!= null) {
				IPlayers players = game.getPlayers();
				NodeIterator pl = getIterator(node, N_XP);
				Node p;
				while ((p = pl.nextNode())!= null) {
					String player = getTag(p);
					players.addPlayer(player);
					IState state = game.getInitialState();
					NodeIterator il = getIterator(node, N_XP);
					Node i;
					while ((i = il.nextNode())!= null) {
						String type = getTag(i);
						IPiece piece = new Piece(type, player);
						NodeIterator vl = getIterator(n, V_XP);
						Node v;
						while ((v = vl.nextNode())!= null) {
							String pos = getText(v);
							state.setPiece(pos, piece);
						}
					}
				}
			} else {
				throw new CommonException("[players] tag not found");
			}
			callback.addGame(name, game);
		}
	}
}
