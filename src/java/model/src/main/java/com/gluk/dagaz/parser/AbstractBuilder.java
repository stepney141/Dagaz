package com.gluk.dagaz.parser;

import java.util.HashMap;
import java.util.Map;

import javax.xml.transform.TransformerException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.apache.xpath.XPathAPI;
import org.w3c.dom.Node;
import org.w3c.dom.traversal.NodeIterator;

import com.gluk.dagaz.api.parser.IBuilder;
import com.gluk.dagaz.exceptions.CommonException;

public abstract class AbstractBuilder implements IBuilder {
	
	protected final static String ALL_XP    = "*";
	protected final static String N_XP      = "n";
	protected final static String V_XP      = "v";
	protected final static String BOARD_XP  = "n[@t=\'board\']";
	protected final static String DIM_XP    = "n[@t=\'dim\']";
	protected final static String DIR_XP    = "n[@t=\'dir\']";
	protected final static String POS_XP    = "n[@t=\'pos\']";
	protected final static String KILL_XP   = "n[@t=\'kill\']";
	protected final static String PIECE_XP  = "n[@t=\'piece\']";
	protected final static String MOVE_XP   = "n[@t=\'move\']";
	protected final static String PRE_XP    = "n[@t=\'pre\']";
	protected final static String POST_XP   = "n[@t=\'post\']";

	private   final static String TYPE_XP   = "name()";
	private   final static String TEXT_XP   = "text()";
	private   final static String TAG_XP    = "@t";
	private   final static String VALUE_XP  = "n/@t";
	private   final static String NAME_XP   = "n[@t=\'name\']/n/@t";
	
	private static XPathFactory xpf = null;
	private Map<String, XPathExpression> xpes = new HashMap<String, XPathExpression>();

	protected XPathExpression getXPath(String e) throws CommonException {
		if (xpf == null) {
			xpf = XPathFactory.newInstance();
		}
		XPathExpression r = xpes.get(e);
		if (r == null) {
			XPath xpath = xpf.newXPath();
			try {
				r = xpath.compile(e);
			} catch (XPathExpressionException ex) {
				throw new CommonException(ex.toString(), ex);
			}
			xpes.put(e, r);
		}
		return r;
	}
	
	protected NodeIterator getIterator(Node n, String xpath) throws CommonException {
		try {
			return XPathAPI.selectNodeIterator(n, xpath);
		} catch (TransformerException ex) {
			throw new CommonException(ex.toString(), ex);
		}
	}
	
	protected NodeIterator getIterator(Node n) throws CommonException {
		try {
			return XPathAPI.selectNodeIterator(n, N_XP);
		} catch (TransformerException ex) {
			throw new CommonException(ex.toString(), ex);
		}
	}
	
	protected String getType(Node n) throws CommonException {
		XPathExpression xpe = getXPath(TYPE_XP);
		try {
			return xpe.evaluate(n);
		} catch (XPathExpressionException ex) {
			throw new CommonException(ex.toString(), ex);
		}
	}
	
	protected String getTag(Node n) throws CommonException {
		XPathExpression xpe = getXPath(TAG_XP);
		try {
			return xpe.evaluate(n);
		} catch (XPathExpressionException ex) {
			throw new CommonException(ex.toString(), ex);
		}
	}
	
	protected String getText(Node n) throws CommonException {
		XPathExpression xpe = getXPath(TEXT_XP);
		try {
			return xpe.evaluate(n);
		} catch (XPathExpressionException ex) {
			throw new CommonException(ex.toString(), ex);
		}
	}
	
	protected String getValue(Node n) throws CommonException {
		XPathExpression xpe = getXPath(VALUE_XP);
		try {
			return xpe.evaluate(n);
		} catch (XPathExpressionException ex) {
			throw new CommonException(ex.toString(), ex);
		}
	}

	protected String getName(Node n) throws CommonException {
		XPathExpression xpe = getXPath(NAME_XP);
		try {
			return xpe.evaluate(n);
		} catch (XPathExpressionException ex) {
			throw new CommonException(ex.toString(), ex);
		}
	}
}
