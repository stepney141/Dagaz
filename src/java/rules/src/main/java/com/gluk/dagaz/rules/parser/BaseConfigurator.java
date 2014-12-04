package com.gluk.dagaz.rules.parser;

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

public abstract class BaseConfigurator {

	private final static String N_XP      = "n";
	private final static String NAME_XP   = "@t";
	private final static String VALUE_XP  = "n/@t";
	
	private static XPathFactory xpf = null;
	private Map<String, XPathExpression> xpes = new HashMap<String, XPathExpression>();

	protected XPathExpression getXPath(String e) throws XPathExpressionException {
		if (xpf == null) {
			xpf = XPathFactory.newInstance();
		}
		XPathExpression r = xpes.get(e);
		if (r == null) {
			XPath xpath = xpf.newXPath();
			r = xpath.compile(e);
			xpes.put(e, r);
		}
		return r;
	}
	
	protected NodeIterator getIterator(Node n, String xpath) throws TransformerException {
		return XPathAPI.selectNodeIterator(n, xpath);
	}
	
	protected NodeIterator getIterator(Node n) throws TransformerException {
		return XPathAPI.selectNodeIterator(n, N_XP);
	}
	
	protected String getName(Node n) throws XPathExpressionException {
		XPathExpression xpe = getXPath(NAME_XP);
		return xpe.evaluate(n);
	}
	
	protected String getValue(Node n) throws XPathExpressionException {
		XPathExpression xpe = getXPath(VALUE_XP);
		return xpe.evaluate(n);
	}
}
