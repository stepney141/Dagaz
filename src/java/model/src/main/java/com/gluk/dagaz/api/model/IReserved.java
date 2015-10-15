package com.gluk.dagaz.api.model;

// TODO: Исключить сравнения строк, используя менеджер имён, связывающий строки с числовыми значениями, по запросу

public interface IReserved {
	// LocalEnvironment
	public final static String LOCAL_TRUE       = "true";                // [out] string - true 
	public final static String LOCAL_FALSE      = "false";               // [out] string - false 

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
	public final static String CMD_JUMP         = "_jump";               // Безусловный переход
	public final static String CMD_GET          = "_get";                // Запрос значения по имени
	public final static String CMD_DROP         = "_drop";               // Удаление значения на стеке
	public final static String CMD_LOG          = "log";                 // Формирование нотации хода
	public final static String CMD_ANY          = "_any";                // Недетерминированный выбор
	public final static String CMD_CHECK        = "_check";              // Проверка выполнения инварианта
	public final static String CMD_IF           = "_if";                 // Условный переход
	public final static String CMD_LET          = "let";                 // Определение переменной
	public final static String CMD_SET          = "set!";                // Изменение значения переменной
	public final static String CMD_INC          = "inc!";                // Инкремент переменной (возвращает значение до инкремента)
	public final static String CMD_DEC          = "dec!";                // Декремент переменной (возвращает значение до декремента)
	public final static String CMD_TAKE         = "take";                // Взятие фигур "в руку"
	public final static String CMD_PUT          = "drop";                // Возврат фигур на доску
	public final static String CMD_CAPTURE      = "capture";             // Удаление фигуры
	public final static String CMD_MARK         = "mark";                // Пометка позиции
	public final static String CMD_BACK         = "back";                // Возврат к отмеченной позиции
	public final static String CMD_NOT          = "not";                 // Логическое отрицание
	public final static String CMD_PLUS         = "+";                   // Сложение
	public final static String CMD_MINUS        = "-";                   // Вычитание или изменение знака

	// Statements
	public final static String STMT_SEQ         = "_seq";                // Последовательность действий
	public final static String STMT_WHILE       = "while";               // Оператор цикла
	public final static String STMT_IF          = "if";                  // Оператор ветвления
	public final static String STMT_ELSE        = "else";                // Альтернатива
	public final static String STMT_ANY         = "any";                 // Оператор недетерминированного выбора
	public final static String STMT_CHECK       = "check";               // Проверка выполнения инварианта
	public final static String STMT_END         = "end-move";            // Завершение варианта хода
}
