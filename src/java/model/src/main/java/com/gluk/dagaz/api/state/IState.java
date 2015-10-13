package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.exceptions.CommonException;

public interface IState {
	boolean isDefined(String name);                                                     // Проверка определения имени
	long getZobristHash();                                                              // Получение хэша состояния
	String getPosition() throws CommonException;                                        // Получение текущей позиции
	IValue getFlag(String name, String pos);                                            // Получение позиционного флага (не копируется state-ом)
	IValue getValue(String name) throws CommonException;                                // Получение глобального значения (массивы не поддерживаются)
	void setFlag(String name, String pos, IValue value) throws CommonException;         // Установка позиционного флага
	void setValue(String name, IValue value) throws CommonException;                    // Установка глобального значения
	IPiece getPiece(String pos);                                                        // Получение фигуры на заданной позиции (позиция содержит не более одной фигуры)
	void setPiece(String pos, IPiece piece) throws CommonException;                     // Добавление фигуры на доску
	void changeAttribute(String pos, String name, IValue value) throws CommonException; // Изменение значения атрибута
	void addToHand(String pos, IPiece piece) throws CommonException;                    // Добавить фигуру в руку
	void dropHand() throws CommonException;                                             // Сбросить фигуры из руки
	boolean navigate(String dir, IEnvironment env) throws CommonException;              // Изменение текущей позиции
	boolean moveHand(String dir, IEnvironment env) throws CommonException;              // Перемещение набора фигур
	void mark() throws CommonException;                                                 // Запомнить текущую позицию
	void back() throws CommonException;                                                 // Вернуться к запомненной позиции
}
