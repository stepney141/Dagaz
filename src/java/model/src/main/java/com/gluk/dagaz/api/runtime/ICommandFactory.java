package com.gluk.dagaz.api.runtime;

import com.gluk.dagaz.exceptions.CommonException;

public interface ICommandFactory {
	boolean isDefined(String name);                                                    // Имя определено?
	ICommand createCommand(String name, IProcessor processor) throws CommonException;  // Создание команды
}
