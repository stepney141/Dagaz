package com.gluk.dagaz.api.model;

import com.gluk.dagaz.exceptions.CommonException;

public interface IPlayers {
	boolean isDefined(String player, String name);                                   // Проверка определения имени                               
	IValue get(String player, String name) throws CommonException;                   // Получение значения по имени
	void addPlayer(String name) throws CommonException;                              // Добавление игроков
	void addSymmetry(String player, String from, String to) throws CommonException;  // Определение симметрий
	String getDirection(String player, String from);                                 // Получение симметричного направления
	int getTurn(int num) throws CommonException;                                     // Получение номера хода
	int getOrder(int num) throws CommonException;                                    // Получение индекса очерёдности хода
	String getPlayer(int num) throws CommonException;                                // Получение имени игрока
}
