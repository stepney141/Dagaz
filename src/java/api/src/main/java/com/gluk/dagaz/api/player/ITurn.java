package com.gluk.dagaz.api.player;

public interface ITurn {
	boolean isRandom();
	IPlayer getPlayer();
	String  getMode();
}
