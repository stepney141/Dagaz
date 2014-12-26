package com.gluk.dagaz.tests.converter;

import java.io.FileWriter;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.log4j.Logger;
import org.w3c.dom.Document;

import com.gluk.dagaz.rules.parser.Configuration;

public class Converter extends BaseApplication {
	
    private static final Logger LOGGER = Logger.getLogger(Converter.class);

    private final static String DOC_SCOPE         = "../../../drf";
	private final static String DOC_NAME          = "windmill.drf";
    private final static String TRANSFORM_SCOPE   = "../../../xslt";
    private final static String BASE_TRANSFORM    = "drf-to-internal.xsl";
    private final static String VARIANT_TRANSFORM = "variants.xsl";
    private final static String OUTPUT_NAME       = "out.xml";

	public static void main(String[] args) {
		Converter conv = new Converter();
		conv.exec();
	}
	
	public void exec() {
		try {
			Configuration conf = new Configuration(this, DOC_NAME);
			conf.setDocumentScope(DOC_SCOPE);
			conf.setTransformationScope(TRANSFORM_SCOPE);
			conf.addTransformation(VARIANT_TRANSFORM);
			conf.addTransformation(BASE_TRANSFORM);
			Document doc = conf.getDocument();
			DOMSource src = new DOMSource(doc);
			
			Transformer transformer = TransformerFactory.newInstance().newTransformer();
		    transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
		    transformer.setOutputProperty(OutputKeys.METHOD, "xml");
		    transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
		    transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
		    transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		    
		    FileWriter w = new FileWriter(OUTPUT_NAME);
		    StreamResult dst = new StreamResult(w);
		    transformer.transform(src, dst);
		} catch (Exception e) {
			LOGGER.fatal(e.toString());
		}
	}
}
