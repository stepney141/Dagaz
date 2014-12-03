package com.gluk.dagaz.rules.parser;

import javax.xml.transform.Source;
import javax.xml.transform.TransformerException;
import javax.xml.transform.URIResolver;
import javax.xml.transform.stream.StreamSource;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.io.IDataManager;
import com.gluk.dagaz.api.io.IInput;

public class Resolver implements URIResolver {
	
	IApplication app;
	
	public Resolver(IApplication app) {
		this.app = app;
	}

	public Source resolve(String href, String base) throws TransformerException {
		IDataManager dm = app.getDataManager();
		try {
			IInput in = dm.getInput(base, href);
			return new StreamSource(in.getReader());
		} catch (CommonException e) {
			throw new TransformerException(e.toString(), e);
		}
	}
}
