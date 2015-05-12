package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.player.IPlayer;

public interface IState extends IValueSet, IStateNavigation {
	long      getHash();
	long      getHash(String name);
	int       getTurnNumber();
	int       getTurnOrder();
	int       getPartNumber();
	IPlayer   getPlayer();
	boolean   isPositionExists(String name);
	IPosition getPosition(String name);
	IState    createState(String move, String mode, boolean isPartial);
}
