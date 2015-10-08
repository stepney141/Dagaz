package com.gluk.dagaz.parser;

import javax.xml.transform.Source;
import javax.xml.transform.TransformerException;
import javax.xml.transform.URIResolver;
import javax.xml.transform.stream.StreamSource;

import com.gluk.dagaz.api.parser.IDataManager;
import com.gluk.dagaz.api.parser.IInput;
import com.gluk.dagaz.exceptions.CommonException;
import com.gluk.dagaz.utils.Application;

public class Resolver implements URIResolver {
	
	private static URIResolver instance = null;
	
	public static URIResolver getInstance() {
		if (instance == null) {
			instance = new Resolver();
		}
		return instance;
	}
	
	private Resolver() {}
	
	public Source resolve(String href, String base) throws TransformerException {
		IDataManager dm = Application.getInstance().getDataManager();
		try {
			IInput in = dm.getInput(base, href);
			return new StreamSource(in.getReader());
		} catch (CommonException e) {
			throw new TransformerException(e.toString(), e);
		}
	}
}
