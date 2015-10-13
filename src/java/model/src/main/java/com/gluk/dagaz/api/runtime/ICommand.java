package com.gluk.dagaz.api.runtime;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.api.state.IState;
import com.gluk.dagaz.exceptions.CommonException;

public interface ICommand {
	boolean execute(IState state, IEnvironment env) throws CommonException;  // Выполнение команды (false прерывает рассчёт хода)
}
