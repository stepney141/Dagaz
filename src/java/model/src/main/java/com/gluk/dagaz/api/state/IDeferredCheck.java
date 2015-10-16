package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.exceptions.CommonException;

public interface IDeferredCheck extends IState {
	void addDeferredCommand(ICommand c);                    // Добавить команду для отложенной проверки
	void setEnvironment(IEnvironment env);                  // Установить окружение
	boolean check() throws CommonException;                 // Выполнить отложенную проверку
}
