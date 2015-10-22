package com.gluk.dagaz.test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.players.Players;
import com.gluk.dagaz.players.PlayersEnvironment;
import com.gluk.dagaz.state.GlobalEnvironment;
import com.gluk.dagaz.state.LocalEnvironment;
import com.gluk.dagaz.utils.Value;

// TODO: State, StateEnvironment, MoveGenerator

public class StateTests {

	@Test
	public void testGlobalEnvironment() throws CommonException {
		IEnvironment ge = new GlobalEnvironment();
		assertFalse(ge.isDefined("x"));
		assertTrue(ge.get("x").getNumber() == 0);
		assertTrue(ge.isDefined("x"));
		assertFalse(ge.isDefined("y"));
		ge.set("x", Value.create("abc"));
		ge.set("y", Value.create(1));
		assertTrue(ge.isDefined("x"));
		assertTrue(ge.isDefined("y"));
		assertTrue(ge.get("x").getString().equals("abc"));
		assertTrue(ge.get("y").getNumber() == 1);
		ge.del("x");
		assertFalse(ge.isDefined("x"));
		assertTrue(ge.isDefined("y"));
	}

	@Test
	public void testPlayerEnvironment() throws CommonException {
		IEnvironment ge = new GlobalEnvironment();
		ge.set("x", Value.create(1));
		Players p = new Players();
		p.addPlayer("White");
		p.addPlayer("Black");
		IEnvironment pe = new PlayersEnvironment(p, 2, ge);
		assertTrue(pe.isDefined(IReserved.PLAYER_CURRENT));
		assertTrue(pe.isDefined(IReserved.PLAYER_NEXT));
		assertTrue(pe.isDefined(IReserved.PLAYER_TURN));
		assertTrue(pe.isDefined(IReserved.PLAYER_ORDER));
		assertTrue(pe.isDefined("White"));
		assertTrue(pe.isDefined("Black"));
		assertFalse(pe.isDefined("Green"));
		assertTrue(pe.isDefined("x"));
		assertFalse(pe.isDefined("y"));
		p.addSymmetry("Black", "n", "s");
		p.addSymmetry("Black", "s", "n");
		assertTrue(pe.isDefined("n"));
		assertTrue(pe.isDefined("s"));
		assertTrue(pe.get(IReserved.PLAYER_CURRENT).getString().equals("Black"));
		assertTrue(pe.get(IReserved.PLAYER_NEXT).getString().equals("White"));
		assertTrue(pe.get(IReserved.PLAYER_TURN).getNumber() == 1);
		assertTrue(pe.get(IReserved.PLAYER_ORDER).getNumber() == 2);
		assertFalse(pe.get("White").getBoolean());
		assertTrue(pe.get("Black").getBoolean());
		assertTrue(pe.get("n").getString().equals("s"));

		pe = new PlayersEnvironment(p, 3, ge);
		assertTrue(pe.isDefined("n"));
		assertTrue(pe.isDefined("s")); 
		assertTrue(pe.get(IReserved.PLAYER_CURRENT).getString().equals("White"));
		assertTrue(pe.get(IReserved.PLAYER_NEXT).getString().equals("Black"));
		assertTrue(pe.get(IReserved.PLAYER_TURN).getNumber() == 2);
		assertTrue(pe.get(IReserved.PLAYER_ORDER).getNumber() == 1);
		assertTrue(pe.get("White").getBoolean());
		assertFalse(pe.get("Black").getBoolean());
		assertTrue(pe.get("n").getString().equals("n"));
	}

	@Test
	public void testLocalEnvironment() throws CommonException {
		IEnvironment ge = new GlobalEnvironment();
		LocalEnvironment env = new LocalEnvironment(ge);
		assertTrue(env.isDefined("true"));
		assertTrue(env.isDefined("false"));
		assertTrue(env.get("true").getBoolean());
		assertFalse(env.get("false").getBoolean());
		assertTrue(env.isDefined("123"));
		assertTrue(env.isDefined("\"abc\""));
		assertTrue(env.get("123").getNumber() == 123);
		assertTrue(env.get("\"abc\"").getString().equals("abc"));
		assertFalse(env.isDefined("x"));
		assertTrue(env.get("x").getNumber() == 0);
		assertTrue(env.isDefined("x"));
		assertFalse(env.isKnown("x"));
		env.savepoint();
		env.let("x", Value.create(1));
		env.let("y", Value.create(10));
		assertTrue(env.isKnown("x"));
		assertTrue(env.get("x").getNumber() == 1);
		env.savepoint();
		env.set("x", Value.create(2));
		assertTrue(env.get("x").getNumber() == 2);
		env.set("x", Value.create(3));
		assertTrue(env.get("x").getNumber() == 3);
		env.let("x", Value.create(4));
		assertTrue(env.get("x").getNumber() == 4);
		env.del("x");
		assertTrue(env.get("x").getNumber() == 3);
		assertTrue(env.get("y").getNumber() == 10);
		env.rollback();
		assertTrue(env.get("x").getNumber() == 1);
		env.rollback();
		assertTrue(env.get("x").getNumber() == 0);
		assertFalse(env.isKnown("x"));
		assertFalse(env.isDefined("y"));
		env.rollback();
		assertTrue(env.get("x").getNumber() == 0);
	}
}
