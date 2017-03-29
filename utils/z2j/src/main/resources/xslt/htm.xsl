<?xml version="1.0" encoding="utf-8"?> 

<xsl:stylesheet 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
  version="1.0">
  <xsl:output method="html" encoding="utf-8"/>
  <xsl:template match="/game">

<html><head><title><xsl:value-of select="title"/></title></head><body><xsl:text>
</xsl:text>

<xsl:element name = "img">
  <xsl:attribute name = "id">Board</xsl:attribute>
  <xsl:attribute name = "style">display:none</xsl:attribute>
  <xsl:attribute name = "src"><xsl:value-of select="board/image"/></xsl:attribute>
</xsl:element><xsl:text>
</xsl:text>

<xsl:for-each select="piece">
  <xsl:variable name="piece" select="name"/>
  <xsl:for-each select="image">
    <xsl:element name = "img">
      <xsl:attribute name = "id"><xsl:value-of select="player"/><xsl:value-of select="$piece"/></xsl:attribute>
      <xsl:attribute name = "style">display:none</xsl:attribute>
      <xsl:attribute name = "src"><xsl:value-of select="res"/></xsl:attribute>
    </xsl:element><xsl:text>
</xsl:text>
  </xsl:for-each>
</xsl:for-each><xsl:text>
</xsl:text>

<table id="Table" style="margin:auto; font-family:sans-serif; font-size:14px">
  <xsl:element name = "tr">
    <xsl:attribute name = "style">height:<xsl:value-of select="board/height"/>px; vertical-align:top</xsl:attribute>
      <xsl:element name = "td">
        <xsl:attribute name = "id">CanvasCell</xsl:attribute>
        <xsl:attribute name = "style">width:<xsl:value-of select="board/width"/>px</xsl:attribute>
        <xsl:element name = "canvas">
          <xsl:attribute name = "id">Canvas</xsl:attribute>
          <xsl:attribute name = "width"><xsl:value-of select="board/width"/></xsl:attribute>
          <xsl:attribute name = "height"><xsl:value-of select="board/height"/></xsl:attribute>
          <xsl:attribute name = "style">cursor:default</xsl:attribute>Broken canvas...</xsl:element>
      </xsl:element>
      <td style="width:300px;">
        <div id="ScrollDiv" style="height:510px; overflow:auto">
          <img id="GlyphImage" />
          <p id="HelpText"></p>
          <p id="GameSession"></p>
        </div>
      </td>
  </xsl:element>
  <tr>
    <td>
      <div style="height:100px; width:500px; margin-left:auto; margin-right:auto">
        <table>
          <tr id="PieceInfo" style="display:none">
            <td>
              <img id="PieceInfoImage" />
            </td>
            <td id="PieceInfoText"></td>
          </tr>
        </table>
      </div>
    </td>
  </tr>
</table><xsl:text>
</xsl:text>

<script src="http://underscorejs.ru/underscore-min.js"></script><xsl:text>
</xsl:text><script src="../../kernel/dagaz.js"></script><xsl:text>
</xsl:text><script src="../../kernel/model/zrf-model.js"></script><xsl:text>
</xsl:text>
<xsl:for-each select="option[position() &gt; 2 and not (name = preceding-sibling::option/name)]">
  <xsl:element name = "script">
    <xsl:attribute name = "src">../../kernel/model/<xsl:value-of select="name"/>.js</xsl:attribute>
  </xsl:element><xsl:text>
</xsl:text>
</xsl:for-each>
<script src="../../kernel/view/2d/2d-view.js"></script><xsl:text>
</xsl:text>
<xsl:element name = "script">
  <xsl:attribute name = "src"><xsl:value-of select="name"/>.js</xsl:attribute>
</xsl:element><xsl:text>
</xsl:text><script src="../../kernel/controller/app.js"></script><xsl:text>
</xsl:text>

</body>
</html></xsl:template>

</xsl:stylesheet>
