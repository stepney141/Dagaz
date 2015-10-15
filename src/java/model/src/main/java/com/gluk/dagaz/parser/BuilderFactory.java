package com.gluk.dagaz.parser;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.model.IReserved;
import com.gluk.dagaz.api.parser.IBuild;
import com.gluk.dagaz.api.parser.IBuilder;
import com.gluk.dagaz.api.parser.IBuilderFactory;
import com.gluk.dagaz.exceptions.CommonException;

// TODO: Реализовать формы сокращённого вычисления логических выражений

public class BuilderFactory implements IBuilderFactory {

	private static IBuilderFactory instance = null;
	
	private Map<String, Class<?>> classes = new HashMap<String, Class<?>>();
	
	public static IBuilderFactory getInstance() {
		if (instance == null) {
			instance = new BuilderFactory();
		}
		return instance;
	}
	
	private BuilderFactory() {
		classes.put(IReserved.STMT_SEQ,   SeqBuilder.class);
		classes.put(IReserved.STMT_WHILE, WhileBuilder.class);
		classes.put(IReserved.STMT_IF,    IfBuilder.class);
		classes.put(IReserved.STMT_ANY,   AnyBuilder.class);
		classes.put(IReserved.STMT_CHECK, CheckBuilder.class);
		classes.put(IReserved.STMT_END,   EndBuilder.class);
	}

	public IBuilder createBuilder(String name, IBuild build) throws CommonException {
		AbstractBuilder r = null;
		Class<?> c = classes.get(name);
		if (c == null) {
			c = ExpressionBuilder.class;
		}
		try {
			r = (AbstractBuilder)c.newInstance();
			r.setBuild(build);
		} catch (Exception e) {
			throw new CommonException(e.toString(), e);
		}
		return r;
	}
}
