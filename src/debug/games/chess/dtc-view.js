(function() {

Dagaz.Model.drawPiece = function(ctx, region, pos, x, y) {
  var piece = pos.setup.piece;
  var model = pos.setup.model;
  if (!piece || !model) return;
  var l = region.locatePosition(pos);
  if (l === null) return;
  x += (l.dx - piece.dx) / 2 | 0;
  y += (l.dy - piece.dy) / 2 | 0;
  ctx.drawImage(piece.h, x, y, piece.dx, piece.dy);
  var view = region.view;
  var glyph = view.findPiece(model.getType() + model.getOwner());
  if (glyph === null) return;
  ctx.drawImage(glyph.h, x + 13, y + 12, glyph.dx, glyph.dy);
}

})();
