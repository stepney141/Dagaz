package com.gluk.z2j.form;

import com.gluk.z2j.api.form.IForm;
import com.gluk.z2j.api.form.IFormFactory;
import com.gluk.z2j.api.form.IMoveParser;

public class FormFactory implements IFormFactory {
	
	private final static String IF_TAG      = "if";
	private final static String WHILE_TAG   = "while";
	private final static String AND_TAG     = "and";
	private final static String OR_TAG      = "or";

	private static IFormFactory instance = null;
	
	private FormFactory() {}
	
	public static IFormFactory getInstance() {
		if (instance == null) {
			instance = new FormFactory();
		}
		return instance;
	}

	public IForm createForm(String tag, IMoveParser parser) throws Exception {
		if (tag.equals(IF_TAG)) {
			return new IfForm(parser);
		}
		if (tag.equals(WHILE_TAG)) {
			return new WhileForm(parser);
		}
		if (tag.equals(AND_TAG)) {
			return new AndForm(parser);
		}
		if (tag.equals(OR_TAG)) {
			return new OrForm(parser);
		}
		return new ApplyForm(tag, parser);
	}
}
