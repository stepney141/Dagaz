package com.gluk.dagaz.random;

import com.gluk.dagaz.api.random.IRandomGenerator;
import com.gluk.dagaz.exceptions.CommonException;

public class RandomGenerator implements IRandomGenerator, Cloneable {
	
	private ClonableRandom rand;
	
	public RandomGenerator() {
		this.rand = new ClonableRandom();
	}

	public RandomGenerator(long seed) {
		this.rand = new ClonableRandom(seed);
	}

	public RandomGenerator(ClonableRandom rand) {
		this.rand = rand;
	}

	public long getLongValue() {
		long r = 0L;
		synchronized (rand) {
			r = rand.nextLong();
		}
		return r;
	}

	public int getValue(int minValue, int maxValue) throws CommonException {
		if (maxValue < minValue) {
			throw new CommonException("Bad range [" + Integer.toString(minValue) + ", " + Integer.toString(maxValue) + "] for random generator");
		}
		int r = minValue;
		synchronized (rand) {
			r = rand.nextInt(maxValue - minValue + 1) + minValue;
		}
		return r;
	}

	public synchronized IRandomGenerator clone() throws CloneNotSupportedException {
		RandomGenerator r = new RandomGenerator();
		r.rand = rand.clone();
		return r;
	}

}
