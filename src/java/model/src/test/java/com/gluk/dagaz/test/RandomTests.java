package com.gluk.dagaz.test;

import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.gluk.dagaz.api.random.IRandomFactory;
import com.gluk.dagaz.api.random.IRandomGenerator;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.random.RandomFactory;
import com.gluk.dagaz.random.RandomGenerator;

public class RandomTests {
	
	// TODO: Check auto-randomize

	@Test
	public void testRandomCloning() throws CommonException, CloneNotSupportedException {
		IRandomFactory rf = RandomFactory.getInstance();
		RandomGenerator a = (RandomGenerator)rf.getGenerator("a");
		IRandomGenerator b = a.clone();
		assertTrue(a != b);                                // Клонирование генератора создаёт новый объект
		assertTrue(a.getLongValue() == b.getLongValue());  // Вывод клонированного генератора совпадает с с выводом оригинального
		assertTrue(a.getLongValue() == b.getLongValue());
		assertTrue(a.getLongValue() == b.getLongValue());
		assertTrue(a.getLongValue() == b.getLongValue());
		assertTrue(a.getLongValue() == b.getLongValue());
	}
}
