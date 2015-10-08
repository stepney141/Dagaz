package com.gluk.dagaz.api.model;

import com.gluk.dagaz.exceptions.CommonException;

public interface IState {
	IValue getValue(String name) throws CommonException;                              // Получение глобального значения (массивы не поддерживаются)
	void setValue(String name, IValue value) throws CommonException;                  // Установка глобального значения
	IValue getFlag(String name, String position);                                     // Получение позиционного флага (не копируется state-ом)
	void setFlag(String name, String position, IValue value) throws CommonException;  // Установка позиционного флага
	IPiece getPiece(String pos);                                                      // Получение фигуры на заданной позиции (позиция содержит не более одной фигуры)
	void delPiece(String pos) throws CommonException;                                 // Удаление фигуры с доски
	void addPiece(String pos, IPiece piece) throws CommonException;                   // Добавление фигуры на доску
	void addPiece(String pos, String type, String player) throws CommonException;     // Создание фигуры на доске 
}
