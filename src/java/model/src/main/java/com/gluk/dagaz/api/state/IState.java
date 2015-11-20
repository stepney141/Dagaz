package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.model.IBoard;
import com.gluk.dagaz.exceptions.CommonException;

public interface IState {
	IBoard getBoard();                                                                  // Получение описания доски
	long getZobristHash();                                                              // Получение хэша состояния
	boolean isDefined(String name);                                                     // Проверка определения имени
	IValue getValue(String name) throws CommonException;                                // Получение значения
	void setValue(String name, IValue value) throws CommonException;                    // Установка глобального значения
	String getCurrentPosition();                                                        // Получение текущей позиции
	IPiece getPiece(String pos);                                                        // Получение фигуры на заданной позиции (позиция содержит не более одной фигуры)
	void setPiece(String pos, IPiece piece) throws CommonException;                     // Изменение содержимого позиции (добавление или удаление фигуры)
	void takePiece() throws CommonException;                                            // Добавить фигуру в руку
	void dropPieces() throws CommonException;                                           // Сбросить фигуры из руки
	boolean navigate(String dir, IEnvironment env) throws CommonException;              // Изменение текущей позиции
}
