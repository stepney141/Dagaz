package com.gluk.dagaz.test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.model.IPlayers;
import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IValue;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.mock.MockMoveLogger;
import com.gluk.dagaz.mock.MockProcessor;
import com.gluk.dagaz.mock.MockState;
import com.gluk.dagaz.model.Board;
import com.gluk.dagaz.model.Players;
import com.gluk.dagaz.parser.Build;
import com.gluk.dagaz.runtime.CommandFactory;
import com.gluk.dagaz.runtime.Value;
import com.gluk.dagaz.state.GlobalEnvironment;
import com.gluk.dagaz.state.LocalEnvironment;

// TODO: take, put

public class RuntimeTests {

	@Test
	public void testEndCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		MockMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_END, build);
		assertFalse(logger.isClosed());
		assertFalse(c.execute(processor, state, env));
		assertTrue(logger.isClosed());
	}
	
	@Test
	public void testLogCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		MockMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_LOG, build);
		c.addArgument("e2");
		c.addArgument(" - ");
		c.addArgument("e4");
		assertTrue(c.execute(processor, state, env));
		assertTrue(logger.getLog().equals("e2 - e4"));
	}

	@Test
	public void testCheckCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_CHECK, build);
		processor.getStack().push(Value.create(true));
		processor.getStack().push(Value.create(false));
		assertFalse(c.execute(processor, state, env));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().isEmpty());
	}
	
	@Test
	public void testGetCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		env.set("x", Value.quote("y"));
		env.set("y", Value.create(1));
		processor.getStack().push(Value.create("y"));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.quote("x"));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument("x");
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
	}
	
	@Test
	public void testQuoteCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_QUOTE, build);
		processor.getStack().push(Value.create("x"));
		assertTrue(c.execute(processor, state, env));
		IValue v = processor.getStack().pop();
		assertTrue(v.isReference());
		assertTrue(v.getString().equals("x"));
		assertTrue(processor.getStack().isEmpty());
		c.addArgument("x");
		assertTrue(c.execute(processor, state, env));
		v = processor.getStack().pop();
		assertTrue(v.isReference());
		assertTrue(v.getString().equals("x"));
		assertTrue(processor.getStack().isEmpty());
		env.set("x", Value.create(2));
		env.set("y", v);
		c = CommandFactory.getInstance().createCommand(IReserved.CMD_GET, build);
		c.addArgument("y");
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 2);
		assertTrue(processor.getStack().isEmpty());
	}
	
	@Test
	public void testIfCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_IF, build);
		processor.incNextCommand(1);
		c.addArgument(10);
		processor.getStack().push(Value.create(false));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getNextCommand() == 1);
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(true));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getNextCommand() == 10);
		assertTrue(processor.getStack().isEmpty());
	}
	
	@Test
	public void testJumpCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_JUMP, build);
		processor.incNextCommand(1);
		c.addArgument(10);
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getNextCommand() == 10);
		assertTrue(processor.getStack().isEmpty());
	}	
	
	@Test
	public void testDecCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_DEC, build);
		c.addArgument("x");
		env.set("x", Value.create(3));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().peek().getNumber() == 3);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(env.get("x").getNumber() == 2);
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().peek().getNumber() == 2);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(env.get("x").getNumber() == 1);
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().peek().getNumber() == 1);
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(env.get("x").getNumber() == 0);
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().peek().getNumber() == 0);
		assertFalse(processor.getStack().pop().getBoolean());
	}
	
	@Test
	public void testIncCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_INC, build);
		c.addArgument("x");
		env.set("x", Value.create(0));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 0);
		assertTrue(env.get("x").getNumber() == 1);
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(env.get("x").getNumber() == 2);
	}

	@Test
	public void testSetCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_SET, build);
		c.addArgument("x");
		assertFalse(env.isDefined("x"));
		processor.getStack().push(Value.create(1));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.isDefined("x"));
		assertTrue(env.get("x").getNumber() == 1);
	}
	
	@Test
	public void testLetCommand() throws CommonException {
		IPlayers players = new Players();
		IEnvironment ge = new GlobalEnvironment();
		LocalEnvironment env = new LocalEnvironment(ge);
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_LET, build);
		c.addArgument("x");
		assertFalse(env.isDefined("x"));
		processor.getStack().push(Value.create(1));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().isEmpty());
		assertTrue(env.isDefined("x"));
		assertTrue(env.get("x").getNumber() == 1);
	}	
	
	@Test
	public void testDelCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_DEL, build);
		c.addArgument("x");
		env.set("x", Value.create(0));
		assertTrue(env.isDefined("x"));
		assertTrue(c.execute(processor, state, env));
		assertFalse(env.isDefined("x"));
	}	

	@Test
	public void testPlusCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_PLUS, build);
		c.addArgument(0);
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 0);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument(1);
		processor.getStack().push(Value.create(1));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument(2);
		processor.getStack().push(Value.create(2));
		processor.getStack().push(Value.create(3));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 5);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument(3);
		processor.getStack().push(Value.create(5));
		processor.getStack().push(Value.create(4));
		processor.getStack().push(Value.create(3));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 12);
		assertTrue(processor.getStack().isEmpty());
	}
	
	@Test
	public void testMinusCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_MINUS, build);
		c.addArgument(1);
		processor.getStack().push(Value.create(-3));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 3);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument(2);
		processor.getStack().push(Value.create(10));
		processor.getStack().push(Value.create(8));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 2);
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testMulCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_MUL, build);
		c.addArgument(0);
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument(1);
		processor.getStack().push(Value.create(10));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 10);
		assertTrue(processor.getStack().isEmpty());
		c.addArgument(3);
		processor.getStack().push(Value.create(2));
		processor.getStack().push(Value.create(3));
		processor.getStack().push(Value.create(4));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 24);
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testDivCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_DIV, build);
		c.addArgument(2);
		processor.getStack().push(Value.create(6));
		processor.getStack().push(Value.create(3));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 2);
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testModCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_MOD, build);
		c.addArgument(2);
		processor.getStack().push(Value.create(5));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testDropCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_DROP, build);
		processor.getStack().push(Value.create(1));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testEqCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_EQ, build);
		processor.getStack().push(Value.create("123"));
		processor.getStack().push(Value.create(123));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create("abc"));
		processor.getStack().push(Value.create("abc"));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testNeCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_NE, build);
		processor.getStack().push(Value.create("abc"));
		processor.getStack().push(Value.create("cba"));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testLtCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_LT, build);
		processor.getStack().push(Value.create(1));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(2));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(3));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testLeCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_LE, build);
		processor.getStack().push(Value.create(1));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(2));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(3));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testGtCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_GT, build);
		processor.getStack().push(Value.create(1));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(2));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(3));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testGeCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_GE, build);
		processor.getStack().push(Value.create(1));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(2));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		processor.getStack().push(Value.create(3));
		processor.getStack().push(Value.create(2));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testNotCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_NOT, build);
		processor.getStack().push(Value.create(0));
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testZoneCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_ZONE, build);
		c.addArgument("start");
		board.addPosition("a1");
		board.addPosition("a2");
		board.addZone("start", "a1");
		processor.getStack().push(Value.create("a2"));
		assertTrue(c.execute(processor, state, env));
		assertFalse(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
		c.addArgument("a1");
		assertTrue(c.execute(processor, state, env));
		assertTrue(processor.getStack().pop().getBoolean());
		assertTrue(processor.getStack().isEmpty());
	}

	@Test
	public void testAnyCommand() throws CommonException {
		IPlayers players = new Players();
		IBoard board = new Board();
		IMoveLogger logger = new MockMoveLogger();
		IBuild build = new Build(players, board);
		MockProcessor processor = new MockProcessor(build, logger);
		IEnvironment env = new GlobalEnvironment();
		IDeferredCheck state = new MockState();
		ICommand c = CommandFactory.getInstance().createCommand(IReserved.CMD_ANY, build);
		
		assertFalse(processor.execCommand(c, state, env));
		assertTrue(processor.getStack().isEmpty());
		assertTrue(processor.getUndoStack().isEmpty());

		c.addArgument(Value.create(1));
		c.addArgument(Value.create(2));
		c.addArgument(Value.create(3));
		assertTrue(processor.execCommand(c, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 1);
		assertTrue(processor.getStack().isEmpty());
		assertTrue(processor.getUndoStack().size() == 1);

		assertTrue(processor.rollback());
		assertTrue(processor.execCommand(c, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 2);
		assertTrue(processor.getStack().isEmpty());
		assertTrue(processor.getUndoStack().size() == 1);
		
		assertTrue(processor.rollback());
		assertTrue(processor.execCommand(c, state, env));
		assertTrue(processor.getStack().pop().getNumber() == 3);
		assertTrue(processor.getStack().isEmpty());
		assertTrue(processor.getUndoStack().size() == 1);

		assertTrue(processor.rollback());
		assertFalse(processor.execCommand(c, state, env));
		assertTrue(processor.getStack().isEmpty());
		assertFalse(processor.rollback());
		assertTrue(processor.getUndoStack().isEmpty());
	}
}
