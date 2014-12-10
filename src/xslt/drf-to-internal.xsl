<?xml version="1.0"?> 
<xsl:stylesheet 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
  version="1.0">
  <xsl:template match="/r"><r><xsl:apply-templates/></r></xsl:template>
  <xsl:template name="apply_n" match="n">
    <xsl:element name="n">
       <xsl:attribute name="t">
         <xsl:value-of select="a[position()=1]"/>
       </xsl:attribute>
       <xsl:for-each select="*[position()&gt;1]">
         <xsl:choose>
           <xsl:when test="name()='n'">
             <xsl:call-template name="apply_n"/>
           </xsl:when>             
           <xsl:when test="name()='a'">
             <xsl:element name="n">
               <xsl:attribute name="t">
                 <xsl:value-of select="."/>
               </xsl:attribute>
             </xsl:element>
           </xsl:when>             
           <xsl:otherwise>
             <xsl:copy-of select="."/>
           </xsl:otherwise>
         </xsl:choose>
       </xsl:for-each>
    </xsl:element>
  </xsl:template>
</xsl:stylesheet>
