package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.exceptions.CommonException;

public interface IBuild extends IProcessor {
	void addCommand(ICommand command);   // Добавить команду
	int  getOffset();                    // Получить смещение текущей команды
	void addFixup(int offset);           // Добавить привязку выхода на завершение формирования хода
	void fixup() throws CommonException; // Выполнить привязку
	void addLocalName(String name);      // Определить локальную переменную
	boolean isLocalName(String name);    // Локальная переменная?
	void setDeferred(int offset);        // Пометить все команды, начиная с заданного смещения, как отложенные
}
