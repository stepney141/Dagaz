package com.gluk.dagaz.api.rules.runtime;

public interface SystemIds {
	public final static int UNKNOWN_TYPE    = 0; 
	public final static int BOOLEAN_TYPE    = 1; 
	public final static int STRING_TYPE     = 2; 
	public final static int NUMBER_TYPE     = 3; 
	
	public final static long NOT_WORD       = 1L; 
	public final static long AND_WORD       = 2L; 
	public final static long OR_WORD        = 3L; 
	public final static long SEQ_WORD       = 4L; 
	public final static long IF_WORD        = 5L; 
	public final static long WHILE_WORD     = 6L; 
}
