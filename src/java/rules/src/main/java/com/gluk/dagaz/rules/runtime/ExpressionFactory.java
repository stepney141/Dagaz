package com.gluk.dagaz.rules.runtime;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IExpressionFactory;

public class ExpressionFactory implements IExpressionFactory {
	
	private static IExpressionFactory instance = null;
	
	private IApplication app;
	private Map<String, Class<?>> classes = new HashMap<String, Class<?>>();
	
	private ExpressionFactory(IApplication app) {
		this.app = app;
		classes.put("+",                 AddExpression.class);
		classes.put("add-ai-hint",       AiHintExpression.class);
		classes.put("set-ai-weight!",    AiWeightExpression.class);
		classes.put("and",               AndExpression.class);
		classes.put("check-draw",        CheckDrawExpression.class);
		classes.put("check",             CheckExpression.class);
		classes.put("check-loss",        CheckLossExpression.class);
		classes.put("check-win",         CheckWinExpression.class);
		classes.put("decrement!",        DecrementExpression.class);
		classes.put("/",                 DivideExpression.class);
		classes.put("=",                 EqExpression.class);
		classes.put(">",                 GtExpression.class);
		classes.put("if",                IfExpression.class);
		classes.put("increment!",        IncrementExpression.class);
		classes.put("<=",                LeExpression.class);
		classes.put("let",               LetExpression.class);
		classes.put("<",                 LtExpression.class);
		classes.put("*",                 MultiplyExpression.class);
		classes.put("!=",                NeExpression.class);
		classes.put("not",               NotExpression.class);
		classes.put("or",                OrExpression.class);
		classes.put("%",                 RemainderExpression.class);
		classes.put("set!",              SetExpression.class);
		classes.put("-",                 SubExpression.class);
		classes.put("?",                 UnquoteExpression.class);
		classes.put("while",             WhileExpression.class);
	}
	
	public synchronized IExpressionFactory getInstance(IApplication app) {
		if (instance == null) {
			instance = new ExpressionFactory(app);
		}
		return instance;
	}

	@Override
	public IExpression createExpression(String name) throws ParsingException {
		IExpression r = null;
		Class<?> c = classes.get(name);
		try {
			if (c != null) {
				r = (IExpression)c.newInstance();
				r.setApplication(app);
			}
			if (r == null) {
				r = new ApplyExpression();
				r.addArgument(new ConstantExpression(name));
			}
		} catch (Exception e) {
			throw new ParsingException(e.toString(), e);
		}
		return r;
	}

	@Override
	public IExpression createExpression(IExpression expr) throws ParsingException {
		IExpression r = new ApplyExpression();
		try {
			r.addArgument(expr);
		} catch (EvaluationException e) {
			throw new ParsingException(e.toString(), e);
		}
		return r;
	}
}
