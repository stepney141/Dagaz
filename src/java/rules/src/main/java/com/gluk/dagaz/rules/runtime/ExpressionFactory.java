package com.gluk.dagaz.rules.runtime;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.EvaluationException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IExpression;

public class ExpressionFactory {
	
	public final static String IF_WORD     = "if";
	public final static String ELSE_WORD   = "else";
	
	private static ExpressionFactory instance = null;
	
	private IApplication app;
	private Map<String, Class<?>> classes = new HashMap<String, Class<?>>();
	
	private ExpressionFactory(IApplication app) {
		this.app = app;
		classes.put("abs",               AbsExpression.class);
		classes.put("+",                 AddExpression.class);
		classes.put("all",               AllDeterminator.class);
		classes.put("and",               AndExpression.class);
		classes.put("any",               AnyExpression.class);
		classes.put("any-position",      AnyPositionExpression.class);
		classes.put("check-draw",        CheckDrawExpression.class);
		classes.put("check",             CheckExpression.class);
		classes.put("check-loss",        CheckLossExpression.class);
		classes.put("check-win",         CheckWinExpression.class);
		classes.put("comment",           CommentExpression.class);
		classes.put("count",             CountDeterminator.class);
		classes.put("decrement!",        DecrementExpression.class);
		classes.put("/",                 DivideExpression.class);
		classes.put("=",                 EqExpression.class);
		classes.put("exists?",           ExistsDeterminator.class);
		classes.put(">",                 GtExpression.class);
		classes.put(IF_WORD,             IfExpression.class);
		classes.put("increment!",        IncrementExpression.class);
		classes.put("<=",                LeExpression.class);
		classes.put("let",               LetExpression.class);
		classes.put("<",                 LtExpression.class);
		classes.put("max",               MaxExpression.class);
		classes.put("min",               MinExpression.class);
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
	
	public synchronized static ExpressionFactory getInstance(IApplication app) {
		if (instance == null) {
			instance = new ExpressionFactory(app);
		}
		return instance;
	}
	
	public boolean isDefined(String name) {
		return (classes.get(name) != null);
	}

	public IExpression createExpression(String name) throws ParsingException {
		IExpression r = null;
		Class<?> c = classes.get(name);
		try {
			if (c != null) {
				r = (IExpression)c.newInstance();
			}
			if (r == null) {
				r = new ApplyExpression();
				r.addArgument(new ConstantExpression(name));
			}
			r.setApplication(app);
		} catch (Exception e) {
			throw new ParsingException(e.toString(), e);
		}
		return r;
	}

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
