package com.gluk.z2j.api.form;

public interface IFormFactory {
	IForm createForm(String tag, IMoveParser parser) throws Exception;
}
