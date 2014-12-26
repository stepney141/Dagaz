package com.gluk.dagaz.rules.parser;

import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMResult;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.sax.SAXSource;
import javax.xml.transform.sax.SAXTransformerFactory;
import javax.xml.transform.sax.TransformerHandler;

import org.w3c.dom.Document;
import org.xml.sax.ContentHandler;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.CriticalException;
import com.gluk.dagaz.api.rules.parser.IConfiguration;

public class Configuration implements IConfiguration {
	
	private final static String LOAD_EXTERNAL_DTD       = "http://apache.org/xml/features/nonvalidating/load-external-dtd"; 
	private final static String JAVAX_TRANSFORM_FACTORY = "javax.xml.transform.TransformerFactory";
	private final static String XALAN_TRANSFORM_FACTORY = "org.apache.xalan.processor.TransformerFactoryImpl";
	
	private static Resolver resolver = null;
	private static TransformerFactory tf = null;
	private static DocumentBuilderFactory df = null;
	
	private IApplication app;
	private Document doc = null;
	
	private String docName;
	private String docScope = "";
	private String transformScope = "";
	
	private List<String> transformList = new ArrayList<String>();
	
	public Configuration(IApplication app, String docName) throws CriticalException {
		this.app = app;
		this.docName = docName;
		if (resolver == null) {
			resolver = new Resolver(app);
		}
		if (tf == null) {
			System.setProperty(JAVAX_TRANSFORM_FACTORY, XALAN_TRANSFORM_FACTORY);
			tf = TransformerFactory.newInstance();
			if (!tf.getFeature(SAXSource.FEATURE) || !tf.getFeature(SAXResult.FEATURE) || !tf.getFeature(DOMResult.FEATURE)) {
				throw new CriticalException("SAX or DOM features are not supported");
			}
			tf.setURIResolver(resolver);
		}
		if (df == null) {
			df = DocumentBuilderFactory.newInstance();
	        df.setAttribute(LOAD_EXTERNAL_DTD, false);
		}
	}

	public void setDocumentScope(String scope) {
		this.docScope = scope;
	}

	public void setTransformationScope(String scope) {
		this.transformScope = scope;
	}

	public void addTransformation(String name) {
		transformList.add(name);
	}
	
	public Document getDocument() throws CommonException {
		if (doc == null) {
			try {
				SAXTransformerFactory stf = (SAXTransformerFactory)tf;
				ContentHandler first = null;
				TransformerHandler last = null;
				for (String name: transformList) {
					TransformerHandler t = stf.newTransformerHandler(resolver.resolve(name, transformScope));
					if (last != null) {
						last.setResult(new SAXResult(t));
					}
					if (first == null) {
						first = t;
					}
					last = t;
				}
				if (last == null) {
					last = stf.newTransformerHandler();
					first = last;
				}
		        doc = df.newDocumentBuilder().newDocument();
		        last.setResult(new DOMResult(doc));
		        Parser parser = new Parser(app, docScope, first);
		        parser.parse(docName);
			} catch (Exception e) {
				throw new CriticalException(e.toString(), e);
			}
		}
		return doc;
	}
}
