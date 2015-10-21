package com.gluk.dagaz.test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.board.Board;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.mock.MockMoveLogger;
import com.gluk.dagaz.mock.MockProcessor;
import com.gluk.dagaz.mock.MockState;
import com.gluk.dagaz.runtime.CommandFactory;
import com.gluk.dagaz.state.GlobalEnvironment;
import com.gluk.dagaz.utils.AnyUndo;
import com.gluk.dagaz.utils.Value;

// TODO: let, capture, take, put

public class RuntimeTests {

	@Test
	public void testEndCommand() throws CommonException {
		IBoard board = new Board();
		MockMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_END, processor);
		assertFalse(logger.isClosed());
		assertFalse(c.execute(state, env));
		assertTrue(logger.isClosed());
	}
	
	@Test
	public void testLogCommand() throws CommonException {
		IBoard board = new Board();
		MockMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_LOG, processor);
		c.addArgument("e2");
		c.addArgument(" - ");
		c.addArgument("e4");
		assertTrue(c.execute(state, env));
		assertTrue(logger.getLog().equals("e2 - e4"));
	}

	@Test
	public void testAnyCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_ANY, processor);
		assertFalse(c.execute(state, env));
		AnyUndo u = new AnyUndo(0);
		processor.getUndo().push(u);
		assertFalse(c.execute(state, env));
		assertTrue(u.getIndex() == 1);
		assertTrue(processor.getUndo().isEmpty());
		c.addArgument(Value.create(1));
		c.addArgument(Value.create(2));
		c.addArgument(Value.create(3));
		u = new AnyUndo(0);
		processor.getUndo().push(u);
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 2);
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 3);
		assertFalse(c.execute(state, env));
		assertTrue(u.getIndex() == 4);
		assertTrue(processor.getUndo().isEmpty());
	}

	@Test
	public void testCheckCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_CHECK, processor);
		processor.getStack().push(Value.create(true));
		processor.getStack().push(Value.create(false));
		assertFalse(c.execute(state, env));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().isEmpty());
	}
	
	@Test
	public void testGetCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, processor);
		env.set("x", Value.quote("y"));
		env.set("y", Value.create(1));
		processor.getStack().push(Value.create("y"));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.quote("x"));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument("x");
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
	}
	
	@Test
	public void testQuoteCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_QUOTE, processor);
		c.addArgument("x");
		env.set("x", Value.create(1));
		assertTrue(c.execute(state, env));
		IValue v = processor.getStack().pop();
		assertTrue(v.isReference());
		assertTrue(processor.getStack().isEmpty());
		env.set("y", v);
		c = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, processor);
		c.addArgument("y");
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
	}
	
	@Test
	public void testIfCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_IF, processor);
		processor.incNextCommand(1);
		c.addArgument(10);
		processor.getStack().push(Value.create(false));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getNextCommand() == 1);
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(true));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getNextCommand() == 10);
		assertTrue(processor.getStack().isEmpty());
	}
	
	@Test
	public void testJumpCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		MockProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_JUMP, processor);
		processor.incNextCommand(1);
		c.addArgument(10);
		assertTrue(c.execute(state, env));
		assertTrue(processor.getNextCommand() == 10);
		assertTrue(processor.getStack().isEmpty());
	}	
	
	@Test
	public void testDecCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_DEC, processor);
		c.addArgument("x");
		env.set("x", Value.create(3));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().peek().getNumber() == 3);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(env.get("x").getNumber() == 2);
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().peek().getNumber() == 2);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(env.get("x").getNumber() == 1);
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().peek().getNumber() == 1);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(env.get("x").getNumber() == 0);
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().peek().getNumber() == 0);
		assertFalse(processor.getStack().pop().getBoolean());
	}
	
	@Test
	public void testIncCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_INC, processor);
		c.addArgument("x");
		env.set("x", Value.create(0));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 0);
		assertTrue(env.get("x").getNumber() == 1);
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(env.get("x").getNumber() == 2);
	}

	@Test
	public void testSetCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_SET, processor);
		c.addArgument("x");
		assertFalse(env.isDefined("x"));
		processor.getStack().push(Value.create(1));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.isDefined("x"));
		assertTrue(env.get("x").getNumber() == 1);
	}
	
	@Test
	public void testDelCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_DEL, processor);
		c.addArgument("x");
		env.set("x", Value.create(0));
		assertTrue(env.isDefined("x"));
		assertTrue(c.execute(state, env));
		assertFalse(env.isDefined("x"));
	}	

	@Test
	public void testPlusCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_PLUS, processor);
		c.addArgument(0);
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 0);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument(1);
		processor.getStack().push(Value.create(1));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument(2);
		processor.getStack().push(Value.create(2));
		processor.getStack().push(Value.create(3));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 5);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument(3);
		processor.getStack().push(Value.create(5));
		processor.getStack().push(Value.create(4));
		processor.getStack().push(Value.create(3));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 12);
		assertTrue(processor.getStack().isEmpty());
	}
	
	@Test
	public void testMinusCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_MINUS, processor);
		c.addArgument(1);
		processor.getStack().push(Value.create(-3));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 3);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument(2);
		processor.getStack().push(Value.create(10));
		processor.getStack().push(Value.create(8));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 2);
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testMulCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_MUL, processor);
		c.addArgument(0);
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument(1);
		processor.getStack().push(Value.create(10));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 10);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument(3);
		processor.getStack().push(Value.create(2));
		processor.getStack().push(Value.create(3));
		processor.getStack().push(Value.create(4));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 24);
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testDivCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_DIV, processor);
		c.addArgument(2);
		processor.getStack().push(Value.create(6));
		processor.getStack().push(Value.create(3));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 2);
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testModCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_MOD, processor);
		c.addArgument(2);
		processor.getStack().push(Value.create(5));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testDropCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_DROP, processor);
		processor.getStack().push(Value.create(1));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testEqCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_EQ, processor);
		processor.getStack().push(Value.create("123"));
		processor.getStack().push(Value.create(123));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create("abc"));
		processor.getStack().push(Value.create("abc"));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testNeCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_NE, processor);
		processor.getStack().push(Value.create("abc"));
		processor.getStack().push(Value.create("cba"));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testLtCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_LT, processor);
		processor.getStack().push(Value.create(1));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(2));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(3));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testLeCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_LE, processor);
		processor.getStack().push(Value.create(1));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(2));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(3));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testGtCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_GT, processor);
		processor.getStack().push(Value.create(1));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(2));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(3));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testGeCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_GE, processor);
		processor.getStack().push(Value.create(1));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(2));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(3));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testNotCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_NOT, processor);
		processor.getStack().push(Value.create(0));
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testZoneCommand() throws CommonException {
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IProcessor processor = new MockProcessor(board, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_ZONE, processor);
		c.addArgument("start");
		board.addPosition("a1");
		board.addPosition("a2");
		board.addZone("start", "a1");
		processor.getStack().push(Value.create("a2"));
		assertTrue(c.execute(state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		c.addArgument("a1");
		assertTrue(c.execute(state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}
}
