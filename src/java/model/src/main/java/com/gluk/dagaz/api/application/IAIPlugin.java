package com.gluk.dagaz.api.application;

import java.util.Collection;

import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.state.State;

public interface IAIPlugin {
	boolean calculate(Collection<IBuild> moves, State state, IEnvironment env) throws CommonException;
}
