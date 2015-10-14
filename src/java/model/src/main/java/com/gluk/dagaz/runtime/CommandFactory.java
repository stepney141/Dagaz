package com.gluk.dagaz.runtime;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.runtime.ICommand;
import com.gluk.dagaz.api.runtime.ICommandFactory;
import com.gluk.dagaz.api.runtime.IProcessor;
import com.gluk.dagaz.exceptions.CommonException;

public class CommandFactory implements ICommandFactory {
	
	private static ICommandFactory instance = null;
	
	private Map<String, Class<?>> classes = new HashMap<String, Class<?>>();
	
	public static ICommandFactory getInstance() {
		if (instance == null) {
			instance = new CommandFactory();
		}
		return instance;
	}
	
	private CommandFactory() {
		classes.put("any",             AnyCommand.class);
		classes.put("back",            BackCommand.class);
		classes.put("capture",         CaptureCommand.class);
		classes.put("check",           CheckCommand.class);
		classes.put("dec!",            DecCommand.class);
		classes.put("_drop",           DropCommand.class);
		classes.put("_end",            EndCommand.class);
		classes.put("_get",            GetCommand.class);
		classes.put("if",              IfCommand.class);
		classes.put("inc!",            IncCommand.class);
		classes.put("_jump",           JumpCommand.class);
		classes.put("let",             LetCommand.class);
		classes.put("log",             LogCommand.class);
		classes.put("mark",            MarkCommand.class);
		classes.put("drop",            PutCommand.class);
		classes.put("set!",            SetCommand.class);
		classes.put("take",            TakeCommand.class);
	}

	public boolean isDefined(String name) {
		return (classes.get(name) != null);
	}

	public ICommand createCommand(String name, IProcessor processor) throws CommonException {
		AbstractCommand r = null;
		Class<?> c = classes.get(name);
		if (c == null) {
			throw new CommonException("Internal error");
		}
		try {
			r = (AbstractCommand)c.newInstance();
			r.setProcessor(processor);
		} catch (Exception e) {
			throw new CommonException(e.toString(), e);
		}
		return r;
	}
}
