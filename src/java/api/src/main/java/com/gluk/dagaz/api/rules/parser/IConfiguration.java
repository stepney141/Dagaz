package com.gluk.dagaz.api.rules.parser;

import org.w3c.dom.Document;

import com.gluk.dagaz.api.exceptions.CommonException;

public interface IConfiguration {
	void setDocumentScope(String scope);
	void setTransformationScope(String scope);
	void addTransformation(String name);
	Document getDocument() throws CommonException;
}
