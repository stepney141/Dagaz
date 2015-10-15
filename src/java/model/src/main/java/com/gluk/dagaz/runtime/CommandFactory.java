package com.gluk.dagaz.runtime;

import java.util.HashMap;
import java.util.Map;

import com.gluk.dagaz.api.model.IReserved;
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
		classes.put(IReserved.CMD_ANY,     AnyCommand.class);
		classes.put(IReserved.CMD_BACK,    BackCommand.class);
		classes.put(IReserved.CMD_CAPTURE, CaptureCommand.class);
		classes.put(IReserved.CMD_CHECK,   CheckCommand.class);
		classes.put(IReserved.CMD_DEC,     DecCommand.class);
		classes.put(IReserved.CMD_DROP,    DropCommand.class);
		classes.put(IReserved.CMD_END,     EndCommand.class);
		classes.put(IReserved.CMD_GET,     GetCommand.class);
		classes.put(IReserved.CMD_IF,      IfCommand.class);
		classes.put(IReserved.CMD_INC,     IncCommand.class);
		classes.put(IReserved.CMD_JUMP,    JumpCommand.class);
		classes.put(IReserved.CMD_LET,     LetCommand.class);
		classes.put(IReserved.CMD_LOG,     LogCommand.class);
		classes.put(IReserved.CMD_MARK,    MarkCommand.class);
		classes.put(IReserved.CMD_PUT,     PutCommand.class);
		classes.put(IReserved.CMD_SET,     SetCommand.class);
		classes.put(IReserved.CMD_TAKE,    TakeCommand.class);
		classes.put(IReserved.CMD_NOT,     NotCommand.class);
		classes.put(IReserved.CMD_PLUS,    PlusCommand.class);
		classes.put(IReserved.CMD_MINUS,   MinusCommand.class);
	}

	public boolean isDefined(String name) {
		return (classes.get(name) != null);
	}

	public ICommand createCommand(String name, IProcessor processor) throws CommonException {
		AbstractCommand r = null;
		Class<?> c = classes.get(name);
		if (c == null) {
			throw new CommonException("Command [" + name + "] not found");
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
