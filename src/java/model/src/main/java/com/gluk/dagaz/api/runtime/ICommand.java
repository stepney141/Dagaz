package com.gluk.dagaz.api.runtime;

import com.gluk.dagaz.api.state.IDeferredCheck;
import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public interface ICommand {
	boolean execute(IDeferredCheck state, IEnvironment env) throws CommonException;  // Выполнение команды (false прерывает рассчёт хода)
	void addArgument(Object arg) throws CommonException;                             // Определение аргумента
	boolean isDeferred();                                                            // Перенести команду в отложенную проверку?
	void setDeferred();                                                              // Пометить команду как отложенную
	String getValueName();
}
