package com.gluk.dagaz.random;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.random.IRandomFactory;
import com.gluk.dagaz.api.random.IRandomGenerator;

public class RandomFactory implements IRandomFactory {
	
	private Map<String, IRandomGenerator> generators = new HashMap<String, IRandomGenerator>();
	
	private static IRandomFactory instance = null;
	
	public synchronized static IRandomFactory getInstance() {
		if (instance == null) {
			instance = new RandomFactory();
		}
		return instance;
	}
	
	private RandomFactory() {}

	public synchronized IRandomGenerator getGenerator(String name, long seed) {
		IRandomGenerator r = generators.get(name);
		if (r == null) {
			r = new RandomGenerator(seed);
			generators.put(name, r);
		}
		return r;
	}

	public synchronized IRandomGenerator getGenerator(String name) {
		IRandomGenerator r = generators.get(name);
		if (r == null) {
			r = new RandomGenerator();
			generators.put(name, r);
		}
		return r;
	}
}
