package com.gluk.dagaz.parser;

import org.w3c.dom.Node;
import org.w3c.dom.traversal.NodeIterator;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.parser.IBuilderCallback;
import com.gluk.dagaz.api.parser.IStatement;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.runtime.CommandFactory;
import com.gluk.dagaz.statements.StatementFactory;

public class CodeBuilder extends AbstractBuilder {
	
	private void buildCode(IStatement s, Node c) throws CommonException {
		NodeIterator nl = getIterator(c, ALL_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			String type = getType(n);
			if (type.equals(N_XP)) {
				s.tag(getTag(n));
				buildCode(s, n);
				s.end();
			} else {
				s.val(getText(n));
			}
		}
	}
	
	private void buildMove(IBuild build, Node p, Node c) throws CommonException {
		IStatement seq = StatementFactory.getInstance().createStatement(IReserved.STMT_SEQ, build);
		NodeIterator nl = getIterator(p, PRE_XP);
		Node n;
		while ((n = nl.nextNode())!= null) {
			buildCode(seq, n);
		}
		buildCode(seq, c);
		build.fixup();
		nl = getIterator(p, POST_XP);
		while ((n = nl.nextNode())!= null) {
			buildCode(seq, n);
		}
		CommandFactory.getInstance().createCommand(IReserved.CMD_ANY, build);
	}

	public void build(Node node, IBuilderCallback callback) throws CommonException {
		NodeIterator pl = getIterator(node, PIECE_XP);
		Node p;
		while ((p = pl.nextNode())!= null) {
			String pieceType = getName(p);
			NodeIterator ml = getIterator(p, MOVE_XP);
			Node m;
			while ((m = ml.nextNode())!= null) {
				IBuild build = new Build(pieceType);
				buildMove(build, p, m);
				callback.addBuild(build);
			}
		}
	}
}
