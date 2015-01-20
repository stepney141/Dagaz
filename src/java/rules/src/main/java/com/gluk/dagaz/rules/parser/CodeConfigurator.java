package com.gluk.dagaz.rules.parser;

import javax.xml.transform.TransformerException;

import org.w3c.dom.Node;
import org.w3c.dom.traversal.NodeIterator;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.rules.runtime.IExpression;
import com.gluk.dagaz.api.rules.runtime.IFunction;
import com.gluk.dagaz.api.rules.runtime.IFunctionList;
import com.gluk.dagaz.rules.runtime.ConstantExpression;
import com.gluk.dagaz.rules.runtime.ExpressionFactory;
import com.gluk.dagaz.rules.runtime.Function;
import com.gluk.dagaz.rules.runtime.GetExpression;
import com.gluk.dagaz.rules.runtime.SeqExpression;

public class CodeConfigurator extends BaseConfigurator {

	private final static String DEFINE_XP  = "r/n[@t=\'define\']";
	private final static String PREFIX_XP  = "r/n[@t=\'define\' and *[position()=1 and name()=\'n\']/@t=\'";
	private final static String POSTFIX_XP = "\']";
	private final static String FUN_XP     = "*[position()=1 and name()=\'n\']";
	private final static String PARAMS_XP  = "*[position()=1 and name()=\'n\']/n";
	private final static String CODE_XP    = "*[position()>1]";
	private final static String ALL_XP     = "*";
	
	private IApplication app;
	private Node root;
	
	public CodeConfigurator(IApplication app, Node root) {
		this.app   = app;
		this.root  = root;
	}
	
	private boolean isFunction(String name) throws TransformerException {
		StringBuffer sb = new StringBuffer();
		sb.append(PREFIX_XP);
		sb.append(name);
		sb.append(POSTFIX_XP);
		NodeIterator nl = getIterator(root, sb.toString());
		return (nl.nextNode()!= null);
	}
	
	private void parseHeader(IFunction f, Node fun) throws Exception {
		NodeIterator nl = getIterator(fun, PARAMS_XP);
		Node n;
        while ((n = nl.nextNode())!= null) {
        	String name = getName(n);
        	f.addParameter(name);
        }
        nl = getIterator(fun, FUN_XP);
        if ((n = nl.nextNode())!= null) {
        	IFunctionList fl = app.getFunctionList();
        	String name = getName(n);
        	fl.addFunction(name, f);
        } else {
        	throw new ParsingException("Invalid declaration");
        }
	}
	
	private int getArity(Node stmt) throws Exception {
		int r = 0;
		NodeIterator nl = getIterator(stmt, ALL_XP);
        while (nl.nextNode()!= null) r++;
		return r;
	}
	
	private void parseStatement(IExpression parent, Node stmt, int ix) throws Exception {
		String type = getType(stmt);
		if (type.equals(Parser.STR_TAG)) {
			IExpression e = new ConstantExpression(getText(stmt));
			parent.addArgument(e);
			return;
		}
		if (type.equals(Parser.NUM_TAG)) {
			IExpression e = new ConstantExpression(Long.parseLong(getText(stmt)));
			parent.addArgument(e);
			return;
		}
		if (!type.equals(Parser.NODE_TAG)) {
			throw new ParsingException("Bad node [" + type + "]");
		}
		ExpressionFactory ef = ExpressionFactory.getInstance(app);
		String name = getName(stmt);
		int arity = getArity(stmt);
		if ((arity == 0) && !ef.isDefined(name) && !isFunction(name)) {
			if (parent.isQuoted(ix)) {
				IExpression e = new ConstantExpression(name);
				parent.addArgument(e);
				return;
			} else {
				IExpression e = new GetExpression(name);
				parent.addArgument(e);
				return;
			}
		}
		IExpression e = ef.createExpression(name);
		IExpression seq = e;
		NodeIterator nl = getIterator(stmt, ALL_XP);
		Node n;
		int i = 0;
        while ((n = nl.nextNode())!= null) {
        	if (name.equals(ExpressionFactory.IF_WORD) && ((i == 1) || getName(n).equals(ExpressionFactory.ELSE_WORD))) {
        		seq = new SeqExpression();
        		e.addArgument(seq);
        	}
        	if (!getName(n).equals(ExpressionFactory.ELSE_WORD)) {
            	parseStatement(seq, n, i++);
        	}
        }
		parent.addArgument(e);
	}
	
	private void parseCode(IExpression e, Node fun) throws Exception {
		NodeIterator nl = getIterator(fun, CODE_XP);
		Node n;
		int ix = 0;
        while ((n = nl.nextNode())!= null) {
        	parseStatement(e, n, ix++);
        }
	}
	
	private void parseFunction(Node fun) throws Exception {
		IExpression seq = new SeqExpression();
		IFunction f = new Function(seq);
		parseHeader(f, fun);
		parseCode(seq, fun);
	}
	
	public void initApplication() throws CommonException {
		try {
			NodeIterator nl = getIterator(root, DEFINE_XP);
			Node n;
	        while ((n = nl.nextNode())!= null) {
	        	parseFunction(n);
	        }
		} catch (Exception e) {
			throw new ParsingException(e.toString(), e);
		}
	}
}
