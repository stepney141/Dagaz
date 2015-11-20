package com.gluk.dagaz.ai.random;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.application.IAIPlugin;
import com.gluk.dagaz.api.application.IMoveCallback;
import com.gluk.dagaz.api.application.IMoveGenerator;
import com.gluk.dagaz.api.application.IMoveLogger;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.random.IRandomFactory;
import com.gluk.dagaz.api.random.IRandomGenerator;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.random.RandomFactory;
import com.gluk.dagaz.runtime.Processor;
import com.gluk.dagaz.state.MoveGenerator;
import com.gluk.dagaz.state.MoveLogger;
import com.gluk.dagaz.state.State;

public class RandomAI implements IAIPlugin, IMoveCallback {
	
	private final static String RAND_AI     = "_AI";
	private final static String RAND_PLAYER = "_PLAYER";
	
	private IMoveCallback     callback;
	private IRandomGenerator  rand;
	
	private Integer variantsCount = 0;
	private Map<Integer, String> names  = new HashMap<Integer, String>();
	private Map<Integer, IState> states = new HashMap<Integer, IState>();
	
	public RandomAI(IMoveCallback callback) {
		this.callback = callback;
		IRandomFactory rf = RandomFactory.getInstance(); 
		Long player = rf.getGenerator(RAND_PLAYER).getLongValue();
		rand = rf.getGenerator(RAND_AI + player.toString(), player);
	}

	public RandomAI(IMoveCallback callback, long seed) {
		this.callback = callback;
		IRandomFactory rf = RandomFactory.getInstance(); 
		Long player = rf.getGenerator(RAND_PLAYER, seed).getLongValue();
		rand = rf.getGenerator(RAND_AI + player.toString(), player);
	}
	
	private void clear() {
		names.clear();
		states.clear();
		variantsCount = 0;
	}
	
	public void addMove(String notation, IState state) {
		names.put(variantsCount, notation);
		states.put(variantsCount, state);
		variantsCount++;
	}
	
	public boolean calculate(Collection<IBuild> moves, State state, IEnvironment env) throws CommonException {
		clear();
		for (IBuild build: moves) {
			IMoveGenerator gen = new MoveGenerator(this, env);
			IMoveLogger logger = new MoveLogger(state, gen);
			IProcessor processor = new Processor(logger);
			processor.addBuild(build);
			processor.execute(state, env);
		}
		if (variantsCount == 0L) {
			return false;
		}
		Integer ix = rand.getValue(0, variantsCount - 1);
		callback.addMove(names.get(ix), states.get(ix));
		return true;
	}
}
