package com.gluk.dagaz.api.parser;

import org.w3c.dom.Document;

import com.gluk.dagaz.exceptions.CommonException;

public interface ILoader {
	void setDocumentScope(String scope);
	void setTransformationScope(String scope);
	void addTransformation(String name);
	Document getDocument() throws CommonException;
}
