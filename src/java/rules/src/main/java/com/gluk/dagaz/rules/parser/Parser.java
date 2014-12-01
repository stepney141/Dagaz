package com.gluk.dagaz.rules.parser;

import org.xml.sax.ContentHandler;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.AttributesImpl;

import com.gluk.dagaz.api.application.IApplication;
import com.gluk.dagaz.api.exceptions.CommonException;
import com.gluk.dagaz.api.exceptions.ParsingException;
import com.gluk.dagaz.api.io.IDataManager;
import com.gluk.dagaz.api.io.IInput;
import com.gluk.dagaz.api.rules.parser.IParser;

public class Parser implements IParser {
	
    private final static String ROOT_TAG      = "r";
    private final static String NODE_TAG      = "n";
    private final static String ATOM_TAG      = "a";
    private final static String STR_TAG       = "s";
    private final static String NUM_TAG       = "d";

    private final static String INCLUDE_ATOM  = "include";
    
    private final static int    NORMAL_STATUS        = 0; 
    private final static int    WAIT_FILENAME_STATUS = 1; 
    private final static int    WAIT_CLOSE_STATUS    = 2; 
    
    private IApplication app;
    private String scope;
    private ContentHandler handler;
    private boolean isOpened = false;
    private int deep = 0;
    private AttributesImpl empty = new AttributesImpl();
    private int status = NORMAL_STATUS;
    private String fileName;
    private int includeDeep = 0;
    
    public Parser(IApplication app, String scope, ContentHandler handler) {
    	this.app = app;
    	this.scope = scope;
    	this.handler = handler;
    }

	public void openBracket() throws ParsingException {
		if (status == WAIT_FILENAME_STATUS) {
			throw new ParsingException("Invalid status [" + Integer.toString(status) + "]");
		}
		if (status == WAIT_CLOSE_STATUS) {
			status = NORMAL_STATUS;
			return;
		}
		try {
			if (!isOpened) {
				isOpened = true;
	            handler.startDocument();
	            handler.startElement("", ROOT_TAG, ROOT_TAG, empty);
			}
            handler.startElement("", NODE_TAG, NODE_TAG, empty);
			deep++;
		} catch (SAXException e) {
			throw new ParsingException(e.toString(), e);
		}
	}

	public void closeBracket() throws ParsingException {
		if (!isOpened) {
			throw new ParsingException("Not opened document");
		}
		if (status == WAIT_FILENAME_STATUS) {
			throw new ParsingException("Invalid status [" + Integer.toString(status) + "]");
		}
		if (status == WAIT_CLOSE_STATUS) {
			try {
				includeDeep++;
				IDataManager dm = app.getDataManager();
				IInput in = dm.getInput(scope, fileName);
				Scaner scaner = new Scaner(this);
				in.read(scaner);
			} catch (CommonException e) {
				throw new ParsingException(e.toString(), e);
			}
			return;
		}
		if (deep == 0) {
			throw new ParsingException("Unbalanced brackets");
		}
		try {
	        handler.endElement("", NODE_TAG, NODE_TAG);
			deep--;
		} catch (SAXException e) {
			throw new ParsingException(e.toString(), e);
		}
	}

	public void addAtom(String s) throws ParsingException {
		if (!isOpened) {
			throw new ParsingException("Not opened document");
		}
		if (status != NORMAL_STATUS) {
			throw new ParsingException("Invalid status [" + Integer.toString(status) + "]");
		}
		if (s.equals(INCLUDE_ATOM)) {
			status = WAIT_FILENAME_STATUS;
			return;
		}
		if (deep == 0) {
			throw new ParsingException("Syntax error");
		}
		try {
	        handler.startElement("", ATOM_TAG, ATOM_TAG, empty);
	        handler.characters(s.toCharArray(), 0, s.length());
	        handler.endElement("", ATOM_TAG, ATOM_TAG);
		} catch (SAXException e) {
			throw new ParsingException(e.toString(), e);
		}
	}

	public void addLiteral(String s, boolean isNumeric) throws ParsingException {
		if (!isOpened) {
			throw new ParsingException("Not opened document");
		}
		if (status == WAIT_CLOSE_STATUS) {
			throw new ParsingException("Invalid status [" + Integer.toString(status) + "]");
		}
		if (status == WAIT_FILENAME_STATUS) {
			if (isNumeric) {
				throw new ParsingException("Invalid filename type [" + s + "]");
			}
			fileName = s;
			status = WAIT_CLOSE_STATUS;
			return;
		}
		if (deep == 0) {
			throw new ParsingException("Syntax error");
		}
		try {
			if (isNumeric) {
		        handler.startElement("", NUM_TAG, NUM_TAG, empty);
			} else {
		        handler.startElement("", STR_TAG, STR_TAG, empty);
			}
	        handler.characters(s.toCharArray(), 0, s.length());
			if (isNumeric) {
		        handler.endElement("", NUM_TAG, NUM_TAG);
			} else {
		        handler.endElement("", STR_TAG, STR_TAG);
			}
		} catch (SAXException e) {
			throw new ParsingException(e.toString(), e);
		}
	}

	public void closeAll() throws ParsingException {
		if (!isOpened) {
			throw new ParsingException("Not opened document");
		}
		if (includeDeep > 0) {
			includeDeep--;
			return;
		}
		if (status != NORMAL_STATUS) {
			throw new ParsingException("Invalid status [" + Integer.toString(status) + "]");
		}
		if (deep > 0) {
			throw new ParsingException("Unbalanced brackets");
		}
		try {
	        handler.endElement("", ROOT_TAG, ROOT_TAG);
	        handler.endDocument();
		} catch (SAXException e) {
			throw new ParsingException(e.toString(), e);
		}
	}
}
