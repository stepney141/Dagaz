package com.gluk.dagaz.test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.board.Board;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.mock.MockMoveLogger;
import com.gluk.dagaz.mock.MockProcessor;
import com.gluk.dagaz.mock.MockState;
import com.gluk.dagaz.mock.MockStatement;
import com.gluk.dagaz.parser.AbstractStatement;
import com.gluk.dagaz.parser.SeqStatement;
import com.gluk.dagaz.state.GlobalEnvironment;
import com.gluk.dagaz.state.LocalEnvironment;
import com.gluk.dagaz.utils.Value;

// TODO: StateStatement, ZoneStatement, AnyStatement, EndStatement, Get Commands

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
		root.openChild("*");
		root.openChild("+");
		root.addLexem("3");
		root.openChild("/");
		root.addLexem("4");
		root.addLexem("2");
		root.closeChild();
		root.addLexem("1");
		root.closeChild();
		root.openChild("%");
		root.addLexem("8");
		root.addLexem("3");
		root.closeChild();
		root.closeChild();
		processor.execute(state, env);
		assertTrue(processor.getStack().pop().getNumber() == 12);
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testAndStatement() throws CommonException { // (and (dec! a) (dec! b) (dec! c) ) 
		IEnvironment ge = new GlobalEnvironment();
		IEnvironment env = new LocalEnvironment(ge);
		Board board = new Board();
		IDeferredCheck state = new MockState();
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new MockStatement();
		root.setBuild(processor);
		root.openChild("and");
		root.openChild("dec!");
		root.addLexem("a");
		root.closeChild();
		root.openChild("dec!");
		root.addLexem("b");
		root.closeChild();
		root.openChild("dec!");
		root.addLexem("c");
		root.closeChild();
		root.closeChild();
		env.let("a", Value.create(3));
		env.let("b", Value.create(3));
		env.let("c", Value.create(3));
		processor.execute(state, env);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == 2);
		assertTrue(env.get("b").getNumber() == 2);
		assertTrue(env.get("c").getNumber() == 2);
		env.set("a", Value.create(3));
		env.set("b", Value.create(1));
		env.set("c", Value.create(0));
		processor.execute(state, env);
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == 2);
		assertTrue(env.get("b").getNumber() == 0);
		assertTrue(env.get("c").getNumber() == -1);
		env.set("a", Value.create(1));
		env.set("b", Value.create(0));
		env.set("c", Value.create(0));
		processor.execute(state, env);
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == 0);
		assertTrue(env.get("b").getNumber() == -1);
		assertTrue(env.get("c").getNumber() == 0);
	}

	@Test
	public void testOrStatement() throws CommonException { // (or (dec! a) (dec! b) (dec! c) ) 
		IEnvironment ge = new GlobalEnvironment();
		IEnvironment env = new LocalEnvironment(ge);
		Board board = new Board();
		IDeferredCheck state = new MockState();
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new MockStatement();
		root.setBuild(processor);
		root.openChild("or");
		root.openChild("dec!");
		root.addLexem("a");
		root.closeChild();
		root.openChild("dec!");
		root.addLexem("b");
		root.closeChild();
		root.openChild("dec!");
		root.addLexem("c");
		root.closeChild();
		root.closeChild();
		env.let("a", Value.create(0));
		env.let("b", Value.create(0));
		env.let("c", Value.create(0));
		processor.execute(state, env);
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == -1);
		assertTrue(env.get("b").getNumber() == -1);
		assertTrue(env.get("c").getNumber() == -1);
		env.set("a", Value.create(0));
		env.set("b", Value.create(0));
		env.set("c", Value.create(1));
		processor.execute(state, env);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == -1);
		assertTrue(env.get("b").getNumber() == -1);
		assertTrue(env.get("c").getNumber() == 0);
		env.set("a", Value.create(0));
		env.set("b", Value.create(2));
		env.set("c", Value.create(0));
		processor.execute(state, env);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == -1);
		assertTrue(env.get("b").getNumber() == 1);
		assertTrue(env.get("c").getNumber() == 0);
		env.set("a", Value.create(3));
		env.set("b", Value.create(2));
		env.set("c", Value.create(0));
		processor.execute(state, env);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("a").getNumber() == 2);
		assertTrue(env.get("b").getNumber() == 2);
		assertTrue(env.get("c").getNumber() == 0);
	}
	
	@Test
	public void testIfStatement() throws CommonException { // (if (> x 3) (set! x 3)) 
		IEnvironment ge = new GlobalEnvironment();
		IEnvironment env = new LocalEnvironment(ge);
		Board board = new Board();
		IDeferredCheck state = new MockState();
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new SeqStatement();
		root.setBuild(processor);
		root.openChild("if");
		root.openChild(">");
		root.addLexem("x");
		root.addLexem("3");
		root.closeChild();
		root.openChild("set!");
		root.addLexem("x");
		root.addLexem("3");
		root.closeChild();
		root.closeChild();
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
	public void testIfElseStatement() throws CommonException { // (if (> x 3) (set! x 10) else (set! x 0)) 
		IEnvironment ge = new GlobalEnvironment();
		IEnvironment env = new LocalEnvironment(ge);
		Board board = new Board();
		IDeferredCheck state = new MockState();
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new SeqStatement();
		root.setBuild(processor);
		root.openChild("if");
		root.openChild(">");
		root.addLexem("x");
		root.addLexem("3");
		root.closeChild();
		root.openChild("set!");
		root.addLexem("x");
		root.addLexem("10");
		root.closeChild();
		root.addLexem("else");
		root.openChild("set!");
		root.addLexem("x");
		root.addLexem("0");
		root.closeChild();
		root.closeChild();
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
	public void testWhileStatement() throws CommonException { // (while (dec! x) (inc! y)) 
		IEnvironment ge = new GlobalEnvironment();
		IEnvironment env = new LocalEnvironment(ge);
		Board board = new Board();
		IDeferredCheck state = new MockState();
		MockMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		AbstractStatement root = new SeqStatement();
		root.setBuild(processor);
		root.openChild("while");
		root.openChild("dec!");
		root.addLexem("x");
		root.closeChild();
		root.openChild("inc!");
		root.addLexem("y");
		root.closeChild();
		root.closeChild();
		env.let("x", Value.create(3));
		env.let("y", Value.create(0));
		processor.execute(state, env);
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.get("x").getNumber() == -1);
		assertTrue(env.get("y").getNumber() == 3);
	}
}
