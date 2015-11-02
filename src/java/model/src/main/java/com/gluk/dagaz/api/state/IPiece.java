package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.model.IValue;
import com.gluk.dagaz.exceptions.CommonException;

public interface IPiece {
	String getName();                                                      // Тип фигуры
	String getOwner();                                                     // Владелец фигуры
	long   getHash(String pos);                                            // Zobrist Hash фигуры на позиции (по фигурам "в руке" не вычисляется)
	void   addAttribute(String attr, IValue value) throws CommonException; // Инициализация атрибута
	IValue getAttribute(String attr, IValue def) throws CommonException;   // Получение значения атрибута
	IPiece setAttribute(String attr, IValue value) throws CommonException; // Установка значения атрибута
}
