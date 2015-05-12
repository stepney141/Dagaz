package com.gluk.dagaz.api.state;

public interface IRepeatitionHelper extends IState {
	boolean isSituationRepeated(String name, Long hash, int count, int deep);
	boolean isSituationRepeated(int count, int deep);
	boolean isPositionRepeated(String name, Long hash, int count, int deep);
	boolean isPositionRepeated(int count, int deep);
}
