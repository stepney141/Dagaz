package com.gluk.dagaz.tests.converter;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.CriticalException;
import com.gluk.dagaz.api.io.IInput;
import com.gluk.dagaz.api.io.IOutput;

public class FileInput implements IInput {
	
	private String scope;
	private String name;
	
	public FileInput(String scope, String name) {
		this.scope = scope;
		this.name  = name;
	}

	public String getScope() {
		return scope;
	}

	public Reader getReader() throws CommonException {
		StringBuffer sb = new StringBuffer();
		sb.append(scope);
		if (!scope.endsWith("/") && !scope.endsWith("\\")) {
			sb.append('/');
		}
		sb.append(name);
		try {
			return new FileReader(sb.toString());
		} catch (FileNotFoundException e) {
			throw new CriticalException(e.toString(), e);
		}
	}

	public void read(IOutput out) throws CommonException {
		BufferedReader reader = new BufferedReader(getReader());
		String line;
	    try {
			while ((line = reader.readLine()) != null) {
				out.write(line);
			}
			out.close();
		} catch (IOException e) {
			throw new CriticalException(e.toString(), e);
		}
	}
}
