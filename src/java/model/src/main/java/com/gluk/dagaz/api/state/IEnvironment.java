package com.gluk.dagaz.api.state;

import com.gluk.dagaz.exceptions.CommonException;

public interface IEnvironment {                                                     // Управление переменными
	boolean isDefined(String name);                                                 // Имя определено?
	boolean isKnown(String name);                                                   // Имя определено самим окружением?
	void let(String name, IValue value) throws CommonException;                     // Определение переменной
	IValue get(String name) throws CommonException;                                 // Получение значения по имени
	void set(String name, IValue value) throws CommonException;                     // Изменение значения имени
	void del(String name) throws CommonException;                                   // Удаление локального имени
}
