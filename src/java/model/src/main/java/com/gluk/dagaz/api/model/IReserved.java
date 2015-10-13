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
}
