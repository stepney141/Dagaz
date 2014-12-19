package com.gluk.dagaz.rules.random;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.random.IRandomGenerator;

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

	@Override
	public long getLongValue() {
		long r = 0L;
		synchronized (rand) {
			r = rand.nextLong();
		}
		return r;
	}

	@Override
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

	@Override
	public synchronized IRandomGenerator getClone() {
		IRandomGenerator r = null;
		synchronized (rand) {
			r = new RandomGenerator(rand.copy());
		}
		return r;
	}

}
