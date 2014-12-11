<?xml version="1.0"?> 
<xsl:stylesheet 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
  version="1.0">
  <xsl:template match="/r"><r><xsl:apply-templates/></r></xsl:template>
  <xsl:template name="apply_n" match="n">
    <xsl:variable name="name" select="*[position()=1 and name()='a']"/>
    <xsl:choose>
      <xsl:when test="$name='macro'"/>
      <xsl:when test="$name=/r/n[*[position()=1 and name()='a']='macro']/*[position()=2 and name()='a']">
        <xsl:for-each select="/r/n[*[position()=1 and name()='a']='macro' and a[position()=2]=$name]/*[position()&gt;2]">
          <xsl:copy-of select="."/>
        </xsl:for-each>
      </xsl:when>
      <xsl:when test="$name=/r/n[*[position()=1 and name()='a']='macro']/*[position()=2 and name()='n']/*[position()=1 and name()='a']">
        <xsl:for-each select="/r/n[*[position()=1 and name()='a']='macro' and *[position()=2 and name()='n']/a[position()=1]=$name]/*[position()&gt;2]">
          <xsl:copy-of select="."/>
        </xsl:for-each>
      </xsl:when>
      <xsl:otherwise>
        <n><xsl:for-each select="*">
          <xsl:choose>
            <xsl:when test="name()='n'">
              <xsl:call-template name="apply_n"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:copy-of select="."/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:for-each></n>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>
