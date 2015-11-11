package com.gluk.dagaz.test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.mock.MockMoveLogger;
import com.gluk.dagaz.mock.MockProcessor;
import com.gluk.dagaz.mock.MockState;
import com.gluk.dagaz.mock.MockStatement;
import com.gluk.dagaz.model.Board;
import com.gluk.dagaz.model.Grid;
import com.gluk.dagaz.model.Players;
import com.gluk.dagaz.runtime.Value;
import com.gluk.dagaz.state.GlobalEnvironment;
import com.gluk.dagaz.state.LocalEnvironment;
import com.gluk.dagaz.state.PlayersEnvironment;
import com.gluk.dagaz.state.State;
import com.gluk.dagaz.state.StateEnvironment;
import com.gluk.dagaz.statements.AbstractStatement;
import com.gluk.dagaz.statements.SeqStatement;

// TODO: AnyStatement, EndStatement

public class ParserTests {

	@Test
	public void testExpressionStatement() throws CommonException { // (* (+ 3 (/ 4 2) 1) (% 8 3) ) = 12
		IEnvironment ge = new GlobalEnvironment();
		IEnvironment env = new LocalEnvironment(ge);
		Board board = new Board();
		IDeferredCheck state = new MockState();
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new MockStatement();
		root.setBuild(processor);
		root.tag("*");
		root.tag("+");
		root.val("3");
		root.tag("/");
		root.val("4");
		root.val("2");
		root.end();
		root.val("1");
		root.end();
		root.tag("%");
		root.val("8");
		root.val("3");
		root.end();
		root.end();
		processor.execute(state, env);
		assertTrue(processor.getStack().pop().getNumber() == 12);
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testAndStatement() throws CommonException { // (and (dec! a) b (dec! c) ) 
		IEnvironment ge = new GlobalEnvironment();
		IEnvironment env = new LocalEnvironment(ge);
		Board board = new Board();
		IDeferredCheck state = new MockState();
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new MockStatement();
		root.setBuild(processor);
		root.tag("and");
		root.tag("dec!");
		root.val("a");
		root.end();
		root.val("b");
		root.tag("dec!");
		root.val("c");
		root.end();
		root.end();
		env.let("a", Value.create(3));
		env.let("b", Value.create(true));
		env.let("c", Value.create(3));
		processor.execute(state, env);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == 2);
		assertTrue(env.get("c").getNumber() == 2);
		env.set("a", Value.create(3));
		env.set("b", Value.create(true));
		env.set("c", Value.create(0));
		processor.execute(state, env);
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == 2);
		assertTrue(env.get("c").getNumber() == -1);
		env.set("a", Value.create(1));
		env.set("b", Value.create(false));
		env.set("c", Value.create(0));
		processor.execute(state, env);
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == 0);
		assertTrue(env.get("c").getNumber() == 0);
	}

	@Test
	public void testOrStatement() throws CommonException { // (or (dec! a) b (dec! c) ) 
		IEnvironment ge = new GlobalEnvironment();
		IEnvironment env = new LocalEnvironment(ge);
		Board board = new Board();
		IDeferredCheck state = new MockState();
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new MockStatement();
		root.setBuild(processor);
		root.tag("or");
		root.tag("dec!");
		root.val("a");
		root.end();
		root.val("b");
		root.tag("dec!");
		root.val("c");
		root.end();
		root.end();
		env.let("a", Value.create(0));
		env.let("b", Value.create(false));
		env.let("c", Value.create(0));
		processor.execute(state, env);
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == -1);
		assertTrue(env.get("c").getNumber() == -1);
		env.set("a", Value.create(0));
		env.set("b", Value.create(false));
		env.set("c", Value.create(1));
		processor.execute(state, env);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == -1);
		assertTrue(env.get("c").getNumber() == 0);
		env.set("a", Value.create(0));
		env.set("b", Value.create(true));
		env.set("c", Value.create(0));
		processor.execute(state, env);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == -1);
		assertTrue(env.get("c").getNumber() == 0);
		env.set("a", Value.create(3));
		env.set("b", Value.create(true));
		env.set("c", Value.create(0));
		processor.execute(state, env);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == 2);
		assertTrue(env.get("c").getNumber() == 0);
	}
	
	@Test
	public void testIfStatement() throws CommonException { // (if (> x 3) (set! x 3) x) 
		IEnvironment ge = new GlobalEnvironment();
		IEnvironment env = new LocalEnvironment(ge);
		Board board = new Board();
		IDeferredCheck state = new MockState();
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new SeqStatement();
		root.setBuild(processor);
		root.tag("if");
		root.tag(">");
		root.val("x");
		root.val("3");
		root.end();
		root.tag("set!");
		root.val("x");
		root.val("3");
		root.end();
		root.val("x");
		root.end();
		env.let("x", Value.create(1));
		processor.execute(state, env);
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("x").getNumber() == 1);
		env.set("x", Value.create(5));
		processor.execute(state, env);
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("x").getNumber() == 3);
	}
	
	@Test
	public void testIfElseStatement() throws CommonException { // (if (> x 3) x (set! x 10) else (set! x 0) x) 
		IEnvironment ge = new GlobalEnvironment();
		IEnvironment env = new LocalEnvironment(ge);
		Board board = new Board();
		IDeferredCheck state = new MockState();
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new SeqStatement();
		root.setBuild(processor);
		root.tag("if");
		root.tag(">");
		root.val("x");
		root.val("3");
		root.end();
		root.val("x");
		root.tag("set!");
		root.val("x");
		root.val("10");
		root.end();
		root.val("else");
		root.tag("set!");
		root.val("x");
		root.val("0");
		root.end();
		root.val("x");
		root.end();
		env.let("x", Value.create(3));
		processor.execute(state, env);
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("x").getNumber() == 0);
		env.set("x", Value.create(4));
		processor.execute(state, env);
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("x").getNumber() == 10);
	}

	@Test
	public void testWhileStatement() throws CommonException { // (while (dec! x) x (inc! y)) 
		IEnvironment ge = new GlobalEnvironment();
		IEnvironment env = new LocalEnvironment(ge);
		Board board = new Board();
		IDeferredCheck state = new MockState();
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new SeqStatement();
		root.setBuild(processor);
		root.tag("while");
		root.tag("dec!");
		root.val("x");
		root.end();
		root.val("x");
		root.tag("inc!");
		root.val("y");
		root.end();
		root.end();
		env.let("x", Value.create(3));
		env.let("y", Value.create(0));
		processor.execute(state, env);
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("x").getNumber() == -1);
		assertTrue(env.get("y").getNumber() == 3);
	}

	@Test
	public void testStateStatement() throws CommonException { // (set! x (position n e))
		IEnvironment ge = new GlobalEnvironment();
		Players players = new Players();
		players.addPlayer("White");                              
		players.addPlayer("Black");
		IEnvironment pe = new PlayersEnvironment(players, 1, ge);

		Board board = new Board();
		Grid g = new Grid(board);
		g.addDimension("a-b");
		g.addDimension("2-1");
		g.createPositions();
		
		List<Integer> deltas = new ArrayList<Integer>();
		deltas.add(0);
		deltas.add(1);
		g.addDirection("s", deltas);
		deltas.clear();
		deltas.add(0);
		deltas.add(-1);
		g.addDirection("n", deltas);
		deltas.clear();
		deltas.add(1);
		deltas.add(0);
		g.addDirection("e", deltas);
		deltas.clear();
		deltas.add(-1);
		deltas.add(0);
		g.addDirection("w", deltas);
		
		State state = new State(board);
		IEnvironment se = new StateEnvironment(state, pe);
		IEnvironment env = new LocalEnvironment(se);
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new SeqStatement();
		
		root.setBuild(processor);
		root.tag("set!");
		root.val("x");
		root.tag("position");
		root.val("n");
		root.val("e");
		root.end();
		root.end();
		
		state.setCurrentPosition("a1");
		processor.execute(state, env);
		assertTrue(env.get("x").getString().equals("b2"));
		assertTrue(state.getCurrentPosition().equals("a1"));
		
		state.setCurrentPosition("a2");
		processor.execute(state, env);
		assertFalse(env.get("x").getBoolean());
		assertTrue(state.getCurrentPosition().equals("a2"));

		state.setCurrentPosition("b1");
		processor.execute(state, env);
		assertFalse(env.get("x").getBoolean());
		assertTrue(state.getCurrentPosition().equals("b1"));
	}

	@Test
	public void testZoneStatement() throws CommonException { // (set! x (in-zone? home a1)) (set! y (in-zone? home))
		IEnvironment ge = new GlobalEnvironment();
		Players players = new Players();
		players.addPlayer("White");                              
		players.addPlayer("Black");
		IEnvironment pe = new PlayersEnvironment(players, 1, ge);

		Board board = new Board();
		board.addPosition("a1");
		board.addPosition("a2");
		board.addPosition("b1");
		board.addPosition("b2");
		board.addZone("home", "b1");
		board.addZone("home", "White", "a1");
		board.addZone("home", "Black", "b2");
		
		State state = new State(board);
		IEnvironment se = new StateEnvironment(state, pe);
		IEnvironment env = new LocalEnvironment(se);
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new SeqStatement();

		root.setBuild(processor);
		root.tag("set!");
		root.val("x");
		root.tag("in-zone?");
		root.val("home");
		root.val("a1");
		root.end();
		root.end();

		root.tag("set!");
		root.val("y");
		root.tag("in-zone?");
		root.val("home");
		root.end();
		root.end();
		
		assertTrue(board.inZone("home", "a1", env));
		assertFalse(board.inZone("home", "a2", env));
		assertTrue(board.inZone("home", "b1", env));
		assertFalse(board.inZone("home", "b2", env));
		
		state.setCurrentPosition("b1");
		processor.execute(state, env);
		assertTrue(env.get("x").getBoolean());
		assertTrue(env.get("y").getBoolean());

		pe = new PlayersEnvironment(players, 2, ge);
		se = new StateEnvironment(state, pe);
		env = new LocalEnvironment(se);

		assertFalse(board.inZone("home", "a1", env));
		assertFalse(board.inZone("home", "a2", env));
		assertTrue(board.inZone("home", "b1", env));
		assertTrue(board.inZone("home", "b2", env));
		
		state.setCurrentPosition("a2");
		processor.execute(state, env);
		assertFalse(env.get("x").getBoolean());
		assertFalse(env.get("y").getBoolean());
	}
}
