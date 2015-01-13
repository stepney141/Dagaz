package com.gluk.dagaz.tests.scripting;

import org.apache.log4j.Logger;

import com.gluk.dagaz.api.rules.board.IBoardConfiguration;
import com.gluk.dagaz.api.rules.runtime.IEnvironment;
import com.gluk.dagaz.api.rules.runtime.IFunction;
import com.gluk.dagaz.api.rules.runtime.IFunctionList;
import com.gluk.dagaz.api.rules.runtime.IValue;
import com.gluk.dagaz.rules.parser.CodeConfigurator;
import com.gluk.dagaz.rules.parser.Configuration;
import com.gluk.dagaz.rules.runtime.EnvironmentProxy;

public class Scripting extends BaseApplication {

    private static final Logger LOGGER = Logger.getLogger(Scripting.class);

    private final static String SCRIPT_SCOPE      = "./drf";
	private final static String SCRIPT_NAME       = "fib.drf";
    private final static String TRANSFORM_SCOPE   = "../../../xslt";
    private final static String BASE_TRANSFORM    = "drf-to-internal.xsl";
    private final static int    ITERATION_COUNT   = 1000;

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
			IFunctionList fl = getFunctionList();
			IFunction f = fl.getFunction("main@0");
			IBoardConfiguration board = new Board();
			for (long x = 1; x <= 20; x++) {
				IEnvironment env = new Environment(x);
				IEnvironment proxy = new EnvironmentProxy(env, board, true);
				long timestamp = System.currentTimeMillis();
				IValue v = null;
				for (int i=0; i < ITERATION_COUNT; i++) {
					v = f.getExpression().getValue(proxy);
				}
				if (v != null) {
					env.setValue("out", v);
				}
				LOGGER.debug("Evaluation Time = " + Long.toString(System.currentTimeMillis() - timestamp));
			}
		} catch (Exception e) {
			LOGGER.fatal(e.toString());
		}
	}
}
