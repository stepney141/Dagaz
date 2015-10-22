package com.gluk.dagaz.api.state;

import com.gluk.dagaz.exceptions.CommonException;

public interface ITransactional {               // Управление откатом окружений
	void    savepoint();                        // Установка точки для отката
	boolean rollback() throws CommonException;  // Откат к предыдущему сохранению
	void    clear();                            // Полная очистка истории
}
