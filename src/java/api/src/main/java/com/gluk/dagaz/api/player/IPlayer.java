package com.gluk.dagaz.api.player;

public interface IPlayer {
	String  getName();
	boolean isFriend(String player);
    boolean isEnemy(String player);
}
