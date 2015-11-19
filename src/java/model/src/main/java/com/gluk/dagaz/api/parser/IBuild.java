package com.gluk.dagaz.api.parser;

import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.api.model.IPlayers;
import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;

public interface IBuild {
	void     disassemble();                             // Вывод листинга
	int      getSize();                                 // Количество команд
	ICommand getCommand(int ix) throws CommonException; // Получение команды
	void     addCommand(ICommand command);              // Добавить команду
	int      getOffset();                               // Получить смещение текущей команды
	void     addFixup(int offset);                      // Добавить привязку выхода на завершение формирования хода
	void     fixup() throws CommonException;            // Выполнить привязку
	void     addLocalName(String name);                 // Определить локальную переменную
	boolean  isLocalName(String name);                  // Локальная переменная?
	void     setDeferred(int offset);                   // Пометить все команды, начиная с заданного смещения, как отложенные
	IPlayers getPlayers();                              // Получение описания игроков
	IBoard   getBoard();                                // Получение описания доски
	String   getPieceType();                            // Получение типа фигуры (владеющей описанием хода)
}
