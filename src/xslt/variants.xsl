<?xml version="1.0"?> 
<xsl:stylesheet 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
  xmlns:exsl="http://exslt.org/common"
  version="1.0">
  <xsl:template match="/r"><r><xsl:apply-templates/></r></xsl:template>
  <xsl:template match="n">
    <xsl:choose>
      <xsl:when test="*[position()=1 and name()='a']='variant'">
        <xsl:variable name="u">
          <xsl:copy-of select="n"/>
          <xsl:copy-of select="/r/n[*[position()=1 and name()='a']='game']/n"/>
        </xsl:variable>
        <n><a>game</a><xsl:for-each select="exsl:node-set($u)/n">
            <xsl:variable name="pos" select="position()"/>
            <xsl:if test="$pos=1 or not(*[position()=1 and name()='a'] = preceding-sibling::n/*[position()=1 and name()='a'])">
              <xsl:copy-of select="."/>
            </xsl:if>
        </xsl:for-each></n>
      </xsl:when>             
      <xsl:otherwise>
        <xsl:copy-of select="."/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>
