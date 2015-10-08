package com.gluk.dagaz.api.model;

import com.gluk.dagaz.exceptions.CommonException;

// TODO: Инициализация значений атрибутов
// TODO: Обращение к непроинициализированным атрибутам - ошибка

public interface IPiece {
	String getName();                                                    // Тип фигуры
	String getOwner();                                                   // Владелец фигуры
	long getHash(String pos);                                            // Zobrist Hash фигуры на позиции (по фигурам "в руке" не вычисляется)
	IValue getAttribute(String name) throws CommonException;             // Получение значения атрибута
	void setAttribute(String name, IValue value) throws CommonException; // Установка значения атрибута
}
