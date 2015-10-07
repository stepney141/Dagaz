package com.gluk.dagaz.api;

public interface ICode {
	public final static int GET_CODE = 0; // Обращение к имени
	public final static int LET_CODE = 1; // Определение локального имени
	public final static int DEL_CODE = 2; // Удаление локального имени
	public final static int SET_CODE = 3; // Изменение значения имени
}
