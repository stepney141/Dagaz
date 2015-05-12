package com.gluk.dagaz.tests.scripting;

import org.apache.log4j.Logger;

import com.gluk.dagaz.api.rules.board.IBoardManager;
import com.gluk.dagaz.api.rules.functions.IFunction;
import com.gluk.dagaz.api.rules.functions.IFunctionManager;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.parser.CodeConfigurator;
import com.gluk.dagaz.rules.parser.Configuration;
import com.gluk.dagaz.rules.runtime.utils.EnvironmentProxy;

public class Scripting extends BaseApplication {

    private static final Logger LOGGER = Logger.getLogger(Scripting.class);

    private final static String SCRIPT_SCOPE      = "./drf";
	private final static String SCRIPT_NAME       = "fib.drf";
    private final static String TRANSFORM_SCOPE   = "../../../xslt";
    private final static String BASE_TRANSFORM    = "drf-to-internal.xsl";

    public static void main(String[] args) {
		Scripting script = new Scripting();
		script.exec();
	}

	public void exec() {
		try {
			Configuration conf = new Configuration(this, SCRIPT_NAME);
			conf.setDocumentScope(SCRIPT_SCOPE);
			conf.setTransformationScope(TRANSFORM_SCOPE);
			conf.addTransformation(BASE_TRANSFORM);
			CodeConfigurator code = new CodeConfigurator(this, conf.getDocument());
			code.initApplication();
			IFunctionManager fl = getFunctionManager();
			IFunction f = fl.getFunction("main@0");
			IBoardManager board = new Board();
			long timestamp = System.currentTimeMillis();
			for (int i = 1; i < 10; i++) {
				IEnvironment env = new Environment(i);
				IEnvironment proxy = new EnvironmentProxy(env, board);
				IValue v = null;
				v = f.getCode().getValue(proxy);
				if (v != null) {
					env.setValue("out", v);
				}
			}
			LOGGER.debug("Evaluation Time = " + Long.toString(System.currentTimeMillis() - timestamp));
		} catch (Exception e) {
			LOGGER.fatal(e.toString(), e);
		}
	}
}
