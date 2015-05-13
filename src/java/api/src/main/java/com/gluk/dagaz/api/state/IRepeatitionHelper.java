package com.gluk.dagaz.api.state;

import com.gluk.dagaz.api.exceptions.CommonException;

public interface IRepeatitionHelper {
	boolean isSituationRepeated(String name, Long hash, int count, int deep) throws CommonException;
	boolean isSituationRepeated(int count, int deep) throws CommonException;
	boolean isPositionRepeated(String name, Long hash, int count, int deep) throws CommonException;
	boolean isPositionRepeated(int count, int deep) throws CommonException;
}
