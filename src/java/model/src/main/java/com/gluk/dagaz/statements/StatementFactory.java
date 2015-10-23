package com.gluk.dagaz.statements;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.parser.IStatementFactory;
import com.gluk.dagaz.api.parser.IStatementInternal;
import com.gluk.dagaz.exceptions.CommonException;

public class StatementFactory implements IStatementFactory {

	private static IStatementFactory instance = null;
	
	private Map<String, Class<?>> classes = new HashMap<String, Class<?>>();
	
	public static IStatementFactory getInstance() {
		if (instance == null) {
			instance = new StatementFactory();
		}
		return instance;
	}
	
	private StatementFactory() {
		classes.put(IReserved.STMT_SEQ,         SeqStatement.class);
		classes.put(IReserved.STMT_WHILE,       WhileStatement.class);
		classes.put(IReserved.STMT_IF,          IfStatement.class);
		classes.put(IReserved.STMT_ANY,         AnyStatement.class);
		classes.put(IReserved.STMT_CHECK,       CheckStatement.class);
		classes.put(IReserved.STMT_END,         EndStatement.class);
		classes.put(IReserved.STMT_OR,          OrStatement.class);
		classes.put(IReserved.STMT_AND,         AndStatement.class);
		classes.put(IReserved.STMT_LET,         LetStatement.class);
		classes.put(IReserved.STMT_SET,         SetStatement.class);
		classes.put(IReserved.STMT_LOG,         LogStatement.class);
		classes.put(IReserved.STMT_TRACE,       LogStatement.class);
		classes.put(IReserved.STMT_INC,         IncStatement.class);
		classes.put(IReserved.STMT_DEC,         DecStatement.class);
		classes.put(IReserved.STATE_IS_EMPTY,   StateStatement.class);
		classes.put(IReserved.STATE_NOT_EMPTY,  StateStatement.class);
		classes.put(IReserved.STATE_IS_ENEMY,   StateStatement.class);
		classes.put(IReserved.STATE_NOT_ENEMY,  StateStatement.class);
		classes.put(IReserved.STATE_IS_FRIEND,  StateStatement.class);
		classes.put(IReserved.STATE_NOT_FRIEND, StateStatement.class);
		classes.put(IReserved.STATE_POSITION,   StateStatement.class);
		classes.put(IReserved.STATE_PLAYER,     StateStatement.class);
		classes.put(IReserved.STATE_PIECE,      StateStatement.class);
		classes.put(IReserved.STMT_IN_ZONE,     ZoneStatement.class);
		classes.put(IReserved.STMT_NOT_ZONE,    ZoneStatement.class);
	}

	public IStatementInternal createStatement(String name, IBuild build) throws CommonException {
		AbstractStatement r = null;
		Class<?> c = classes.get(name);
		if (c == null) {
			c = ExpressionStatement.class;
		}
		try {
			r = (AbstractStatement)c.newInstance();
			r.setBuild(build);
		} catch (Exception e) {
			throw new CommonException(e.toString(), e);
		}
		return r;
	}
}
