package com.gluk.dagaz.api;

import com.gluk.dagaz.exceptions.CommonException;

public interface IEnvironment {                                                     // Управление переменными
	boolean isDefined(String name) throws CommonException;                          // Имя определено?
	void let(String name, IValue value) throws CommonException;                     // Определение переменной
	IValue get(String name) throws CommonException;                                 // Получение значения по имени
	IValue get(String name, String opt) throws CommonException;                     // Оптимизированное получение значения (по заданной позиции или игроку)
	void set(String name, IValue value) throws CommonException;                     // Изменение значения имени
	void del(String name) throws CommonException;                                   // Удаление локального имени
}
