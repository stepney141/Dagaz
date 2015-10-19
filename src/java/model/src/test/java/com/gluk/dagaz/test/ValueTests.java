package com.gluk.dagaz.test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Value;

public class ValueTests {
	
	@Test
	public void testValueNumConverts() throws CommonException {
		int num = 42;
		IValue v = Value.create(num);
		assertTrue(v.getNumber() == num);
		assertTrue(v.getString().equals(Integer.toString(num)));
		assertTrue(v.getBoolean());
	}

	@Test
	public void testValueBoolConverts() throws CommonException {
		IValue v = Value.create(true);
		assertFalse(v.getString().equals("0"));
		assertTrue(v.getBoolean());
	}

	@Test
	public void testValueCache() throws CommonException {
		IValue a = Value.create("0");
		IValue b = Value.create(false);
		IValue c = Value.create("");
		assertTrue(a == b);
		assertFalse(a == c);
		assertTrue(a.getBoolean() == c.getBoolean());
	}
}
