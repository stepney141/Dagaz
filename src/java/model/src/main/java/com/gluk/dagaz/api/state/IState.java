package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.exceptions.CommonException;

public interface IState {
	long getZobristHash();
	void copyTo(IState state) throws CommonException;                                 // Копирование состояния
	IValue getFlag(String name, String pos);                                          // Получение позиционного флага (не копируется state-ом)
	IValue getValue(String name) throws CommonException;                              // Получение глобального значения (массивы не поддерживаются)
	void setFlag(String name, String pos, IValue value) throws CommonException;       // Установка позиционного флага
	void setValue(String name, IValue value) throws CommonException;                  // Установка глобального значения
	IPiece getPiece(String pos);                                                      // Получение фигуры на заданной позиции (позиция содержит не более одной фигуры)
	void setPiece(String pos, IPiece piece) throws CommonException;                   // Добавление фигуры на доску
	void addToHand(String pos, IPiece piece) throws CommonException;                  // Добавить фигуру в руку
	void dropHand() throws CommonException;                                           // Сбросить фигуры из руки
	String getCurrentPos() throws CommonException;                                    // Получение текущей позиции
	boolean navigate(String dir, IEnvironment env) throws CommonException;            // Изменение текущей позиции
	boolean moveHand(String dir, IEnvironment env) throws CommonException;            // Перемещение набора фигур
}
