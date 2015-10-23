package com.gluk.dagaz.api.parser;

import org.w3c.dom.Node;

import com.gluk.dagaz.exceptions.CommonException;

public interface IBuilder {
	void build(Node node, IBuilderCallback callback) throws CommonException;
}
