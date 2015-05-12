package com.gluk.dagaz.api.player;

import com.gluk.dagaz.api.exceptions.CommonException;

public interface IPlayerManager {
	ITurn   addTurn(String name, boolean isRandom, String mode);
	ITurn   addTurn(String name, boolean isRandom);
	IPlayer getPlayer(String name) throws CommonException;
	ITurn   getTurn(int turnOrder) throws CommonException;
	int     getNextOrder(int turnOrder) throws CommonException;
}
