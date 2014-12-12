<?xml version="1.0"?> 
<xsl:stylesheet 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
  xmlns:exsl="http://exslt.org/common"
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
        <xsl:variable name="values" select="*[position()&gt;1]"/>
        <xsl:variable name="params" select="/r/n[*[position()=1 and name()='a']='macro' and *[position()=2 and name()='n']/a[position()=1]=$name]/*[position()=2]/*[position()&gt;1]"/>
        <xsl:for-each select="/r/n[*[position()=1 and name()='a']='macro' and *[position()=2 and name()='n']/a[position()=1]=$name]/*[position()&gt;2]">
          <xsl:call-template name="apply_a">
            <xsl:with-param name="values" select="$values"/>
            <xsl:with-param name="params" select="$params"/>
          </xsl:call-template>
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
  <xsl:template name="apply_a">
    <xsl:param name="values"/>
    <xsl:param name="params"/>
    <xsl:choose>
      <xsl:when test="name()='a' and text()=exsl:node-set($params)[position()=1]">
        <xsl:copy-of select="exsl:node-set($values)[position()=1]"/>
      </xsl:when>
      <xsl:when test="name()='a' and text()=exsl:node-set($params)[position()=2]">
        <xsl:copy-of select="exsl:node-set($values)[position()=2]"/>
      </xsl:when>
      <xsl:when test="name()='a' and text()=exsl:node-set($params)[position()=3]">
        <xsl:copy-of select="exsl:node-set($values)[position()=3]"/>
      </xsl:when>
      <xsl:when test="name()='a' and text()=exsl:node-set($params)[position()=4]">
        <xsl:copy-of select="exsl:node-set($values)[position()=4]"/>
      </xsl:when>
      <xsl:when test="name()='a' and text()=exsl:node-set($params)[position()=5]">
        <xsl:copy-of select="exsl:node-set($values)[position()=5]"/>
      </xsl:when>
      <xsl:when test="name()='n'">
         <n><xsl:for-each select="*">
           <xsl:call-template name="apply_a">
             <xsl:with-param name="values" select="$values"/>
             <xsl:with-param name="params" select="$params"/>
           </xsl:call-template>
         </xsl:for-each></n>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy-of select="."/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>
