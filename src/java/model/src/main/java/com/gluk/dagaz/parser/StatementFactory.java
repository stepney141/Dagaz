package com.gluk.dagaz.parser;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.parser.IStatement;
import com.gluk.dagaz.api.parser.IStatementFactory;
import com.gluk.dagaz.exceptions.CommonException;

// TODO: Implement navigated state-functions (is-empty?, is-friend?, etc.)

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
		classes.put(IReserved.STMT_SEQ,   SeqStatement.class);
		classes.put(IReserved.STMT_WHILE, WhileStatement.class);
		classes.put(IReserved.STMT_IF,    IfStatement.class);
		classes.put(IReserved.STMT_ANY,   AnyStatement.class);
		classes.put(IReserved.STMT_CHECK, CheckStatement.class);
		classes.put(IReserved.STMT_END,   EndStatement.class);
		classes.put(IReserved.STMT_OR,    OrStatement.class);
		classes.put(IReserved.STMT_AND,   AndStatement.class);
		classes.put(IReserved.STMT_LET,   LetStatement.class);
		classes.put(IReserved.STMT_SET,   SetStatement.class);
		classes.put(IReserved.STMT_LOG,   LogStatement.class);
		classes.put(IReserved.STMT_INC,   IncStatement.class);
		classes.put(IReserved.STMT_DEC,   DecStatement.class);
	}

	public IStatement createStatement(String name, IBuild build) throws CommonException {
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
