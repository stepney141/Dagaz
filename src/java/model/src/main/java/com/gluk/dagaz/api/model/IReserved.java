package com.gluk.dagaz.api.model;

public interface IReserved {
	// LocalEnvironment
	public final static String LOCAL_TRUE       = "true";                // [out] boolean - true 
	public final static String LOCAL_FALSE      = "false";               // [out] boolean - false 

	// PlayerEnvironment
	public final static String PLAYER_CURRENT   = "current-player";      // [out] string - имя текущего игрока (выполняет переключение хода) 
	public final static String PLAYER_NEXT      = "next-player";         // [out] string - имя игрока выполняющего следующий ход
	public final static String PLAYER_TURN      = "turn-number";         // [out] number - получение номера хода
	public final static String PLAYER_ORDER     = "turn-order";          // [out] number - получение очерёдности внутри хода

	// StateEnvironment
	public final static String STATE_POSITION   = "position";            // [out] string - текущая позиция
	public final static String STATE_PLAYER     = "player";              // [out] string - имя владельца фигуры
	public final static String STATE_PIECE      = "piece";               // [out] string - тип фигуры
	public final static String STATE_IS_EMPTY   = "is-empty?";           // [out] boolean - позиция пуста
	public final static String STATE_NOT_EMPTY  = "not-empty?";          // [out] boolean - позиция не пуста
	public final static String STATE_IS_ENEMY   = "is-enemy?";           // [out] boolean - позиция содержит враждебную фигуру
	public final static String STATE_NOT_ENEMY  = "not-enemy?";          // [out] boolean - позиция не содержит враждебную фигуру
	public final static String STATE_IS_FRIEND  = "is-friend?";          // [out] boolean - позиция содержит дружественную фигуру
	public final static String STATE_NOT_FRIEND = "not-friend?";         // [out] boolean - позиция не содержит дружественную фигуру
	
	// Commands
	public final static String CMD_END          = "_end";                // Завершение расчёта хода
	public final static String CMD_ENV          = "_env";                // Сохранение состояния окружения
	public final static String CMD_JUMP         = "_jump";               // Безусловный переход
	public final static String CMD_GET          = "_get";                // Запрос значения по имени
	public final static String CMD_DROP         = "_drop";               // Удаление значения на стеке
	public final static String CMD_LOG          = "_log";                // Формирование нотации хода
	public final static String CMD_TRACE        = "_trace";              // Трассировка
	public final static String CMD_ANY          = "_any";                // Недетерминированный выбор
	public final static String CMD_CHECK        = "_check";              // Проверка выполнения инварианта
	public final static String CMD_IF           = "_if";                 // Условный переход
	public final static String CMD_LET          = "_let";                // Определение переменной
	public final static String CMD_SET          = "_set";                // Изменение значения переменной
	public final static String CMD_DEL          = "_del";                // Удаление локальной переменной
	public final static String CMD_INC          = "_inc";                // Инкремент переменной (возвращает значение до инкремента)
	public final static String CMD_DEC          = "_dec";                // Декремент переменной (возвращает значение до декремента)
	public final static String CMD_ZONE         = "_zone";               // Проверка принадлежности позиции зоне
	public final static String CMD_TAKE         = "take";                // Взятие фигур "в руку"
	public final static String CMD_PUT          = "drop";                // Возврат фигур на доску
	public final static String CMD_CAPTURE      = "capture";             // Удаление фигуры
	public final static String CMD_NOT          = "not";                 // Логическое отрицание
	public final static String CMD_PLUS         = "+";                   // Сложение
	public final static String CMD_MINUS        = "-";                   // Вычитание или изменение знака
	public final static String CMD_MUL          = "*";                   // Умножение
	public final static String CMD_DIV          = "/";                   // Деление
	public final static String CMD_MOD          = "%";                   // Получение остатка от деления
	public final static String CMD_LE           = "<=";                  // Сравнение числовых значений
	public final static String CMD_LT           = "<";                   // Сравнение числовых значений
	public final static String CMD_GE           = ">=";                  // Сравнение числовых значений
	public final static String CMD_GT           = ">";                   // Сравнение числовых значений
	public final static String CMD_EQ           = "=";                   // Сравнение числовых значений
	public final static String CMD_NE           = "!=";                  // Сравнение числовых значений

	// Statements
	public final static String STMT_SEQ         = "_seq";                // Последовательность действий
	public final static String STMT_WHILE       = "while";               // Оператор цикла
	public final static String STMT_IF          = "if";                  // Оператор ветвления
	public final static String STMT_ELSE        = "else";                // Альтернатива
	public final static String STMT_ANY         = "any";                 // Оператор недетерминированного выбора
	public final static String STMT_CHECK       = "check";               // Проверка выполнения инварианта
	public final static String STMT_END         = "end-move";            // Завершение варианта хода
	public final static String STMT_OR          = "or";                  // Логическое или
	public final static String STMT_AND         = "and";                 // Логическое и
	public final static String STMT_SET         = "set!";                // Определение локальной переменной
	public final static String STMT_LET         = "let";                 // Определение локальной переменной
	public final static String STMT_LOG         = "log";                 // Формирование нотации хода
	public final static String STMT_TRACE       = "trace";               // Трассировка
	public final static String STMT_INC         = "inc!";                // Инкремент переменной (возвращает значение до инкремента)
	public final static String STMT_DEC         = "dec!";                // Декремент переменной (возвращает значение до декремента)
	public final static String STMT_IN_ZONE     = "in-zone?";            // Проверка принадлежности позиции именованной зоне
	public final static String STMT_NOT_ZONE    = "not-zone?";           // Проверка не принадлежности позиции именованной зоне
}
