package com.gluk.dagaz.random;

import com.gluk.dagaz.api.random.IRandomGenerator;
import com.gluk.dagaz.exceptions.CommonException;

public class RandomGenerator implements IRandomGenerator {
	
	private CopyableRandom rand;
	
	public RandomGenerator() {
		this.rand = new CopyableRandom();
	}

	public RandomGenerator(long seed) {
		this.rand = new CopyableRandom(seed);
	}

	public RandomGenerator(CopyableRandom rand) {
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

	public synchronized IRandomGenerator getClone() {
		IRandomGenerator r = null;
		synchronized (rand) {
			r = new RandomGenerator(rand.copy());
		}
		return r;
	}

}
