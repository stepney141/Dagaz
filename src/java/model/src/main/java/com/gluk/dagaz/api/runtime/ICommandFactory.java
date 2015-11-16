package com.gluk.dagaz.api.runtime;

import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.exceptions.CommonException;

public interface ICommandFactory {
	boolean isDefined(String name);                                                    // Имя определено?
	ICommand createCommand(String name, IBuild build) throws CommonException;          // Создание команды
}
