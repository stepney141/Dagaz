package com.gluk.dagaz.api.model;

public interface IReserved {
	// PlayerEnvironment
	public final static String PLAYER_CURRENT   = "current-player";      // [out] string - имя текущего игрока (выполняет переключение хода) 
	public final static String PLAYER_NEXT      = "next-player";         // [out] string - имя игрока выполняющего следующий ход
	public final static String PLAYER_IS_FRIEND = "is-friend?";          // [opt out] boolean - дружественность игрока
	public final static String PLAYER_IS_ENEMY  = "is-enemy?";           // [opt out] boolean - враждебность игрока
	public final static String PLAYER_DIR       = "direction";           // [opt out] string - получение симметричного направления
	public final static String PLAYER_TURN      = "turn-number";         // [out] number - получение номера хода
	public final static String PLAYER_ORDER     = "turn-order";          // [out] number - получение очерёдности внутри хода

	// StateEnvironment
	// TODO: Навигация
	public final static String STATE_PLAYER     = "player";              // [in, opt in, out, opt out] string - имя владельца фигуры
	public final static String STATE_PIECE      = "piece";               // [in, opt in, out, opt out] string - тип фигуры
	public final static String STATE_IS_EMPTY   = "is-empty?";           // [out, opt out] boolean - позиция пуста
	public final static String STATE_NOT_EMPTY  = "not-empty?";          // [out, opt out] boolean - позиция не пуста
	public final static String STATE_IS_ENEMY   = "is-enemy?";           // [out, opt out] boolean - позиция содержит враждебную фигуру
	public final static String STATE_NOT_ENEMY  = "not-enemy?";          // [out, opt out] boolean - позиция не содержит враждебную фигуру
	public final static String STATE_IS_FRIEND  = "is-friend?";          // [out, opt out] boolean - позиция содержит дружественную фигуру
	public final static String STATE_NOT_FRIEND = "not-friend?";         // [out, opt out] boolean - позиция не содержит дружественную фигуру

	// MoveEnvironment
	// end-move - завершение хода
	// log - формирование нотации
	// from - начальная позиция
	// to - конечная позиция
	// capture - взятая фигура
	// подсказки для AI
	public final static String MOVE_END         = "end-move";            // [out] string - нотация хода
	public final static String MOVE_LOG         = "log";                 // [in] string - фрагмент нотации
	public final static String MOVE_FROM        = "from";                // [in,out] string, list - список начальных позиций 
	public final static String MOVE_TO          = "to";                  // [in,out] string, list - список конечных позиций
	public final static String MOVE_CAPTURE     = "capture";             // [in,out] string, list - список позиций взятых фигур
}
