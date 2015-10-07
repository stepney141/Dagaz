package com.gluk.dagaz.api;

import com.gluk.dagaz.exceptions.CommonException;

public interface ITransactional {            // Управление откатом окружений
	void savepoint();                        // Установка точки для отката
	void rollback() throws CommonException;  // Откат к предыдущему сохранению
}
