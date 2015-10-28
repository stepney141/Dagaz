package com.gluk.dagaz.api.model;

import java.util.Collection;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public interface IBoard {
	boolean isDefined(String name);                                                       // Проверка определения имени
	void addPosition(String name) throws CommonException;                                 // Определение позиций
	void delPosition(String name) throws CommonException;                                 // Удаление лишних позиций, созданных grid (вызывается до addLink)
	void addLink(String name, String from, String to) throws CommonException;             // Создание связей
	void delLink(String name, String from) throws CommonException;                        // Удаление лишних связей, созданных grid
	void addZone(String name, String player, String pos) throws CommonException;          // Определение зоны привязанной к игроку
	void addZone(String name, String pos) throws CommonException;                         // Определение зоны
	boolean inZone(String name, String pos, IEnvironment env) throws CommonException;     // Проверка принадлежности позиции зоне
	String navigate(String name, String from, IEnvironment env) throws CommonException;   // Перемещение с указанной позиции
	IValue getDefaultValue(String piece, String name);                                    // Получение значения атрибута по умолчанию
	void setDefaultValue(String piece, String name, IValue value) throws CommonException; // Установка значения атрибута по умолчанию
	IValue getDefaultValue(String name);                                                  // Получение глобального значения по умолчанию
	void setDefaultValue(String name, IValue value) throws CommonException;               // Установка глобального значения по умолчанию
	Collection<String> getPositions();                                                    // Получение списка всех позиций
}
