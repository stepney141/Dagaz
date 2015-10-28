package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.exceptions.CommonException;

public interface IState {
	boolean isDefined(String name);                                                     // Проверка определения имени
	long getZobristHash();                                                              // Получение хэша состояния
	String getPosition() throws CommonException;                                        // Получение текущей позиции
	IValue getValue(String name) throws CommonException;                                // Получение глобального значения (массивы не поддерживаются)
	void setValue(String name, IValue value) throws CommonException;                    // Установка глобального значения
	IPiece getPiece(String pos);                                                        // Получение фигуры на заданной позиции (позиция содержит не более одной фигуры)
	void setPiece(String pos, IPiece piece) throws CommonException;                     // Добавление фигуры на доску
	void addToHand(String pos, IPiece piece) throws CommonException;                    // Добавить фигуру в руку
	void dropHand() throws CommonException;                                             // Сбросить фигуры из руки
	boolean navigate(String dir, IEnvironment env) throws CommonException;              // Изменение текущей позиции
}
