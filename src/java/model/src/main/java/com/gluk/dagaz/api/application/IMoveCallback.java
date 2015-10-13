package com.gluk.dagaz.api.application;

import com.gluk.dagaz.api.state.IState;

public interface IMoveCallback {
	void addMove(String notation, IState state);  // Генерация хода
	void delMove(IState state);                   // Отзыв хода
}
