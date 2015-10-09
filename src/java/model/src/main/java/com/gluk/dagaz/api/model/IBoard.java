package com.gluk.dagaz.api.model;

import com.gluk.dagaz.api.state.IEnvironment;
import com.gluk.dagaz.exceptions.CommonException;

public interface IBoard {
	boolean isDefined(String name);                                                     // Проверка определения имени                               
	void addPosition(String name) throws CommonException;                               // Определение позиций
	void delPosition(String name) throws CommonException;                               // Удаление лишних позиций, созданных grid (вызывается до addLink)
	void addLink(String name, String from, String to) throws CommonException;           // Создание связей
	void delLink(String name, String from) throws CommonException;                      // Удаление лишних связей, созданных grid
	void addZone(String name, String player, String pos) throws CommonException;        // Определение зоны привязанной к игроку
	void addZone(String name, String pos) throws CommonException;                       // Определение зоны
	String navigate(String name, String from, IEnvironment env) throws CommonException; // Перемещение с указанной позиции
	boolean inZone(String name, String pos, IEnvironment env) throws CommonException;   // Проверка принадлежности позиции зоне
}
