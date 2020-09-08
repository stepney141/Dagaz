(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "labyrinth-view") {
      checkVersion(design, name, value);
  }
}

Dagaz.View.showPiece = function(view, ctx, frame, pos, piece, model, x, y) {
  if (model.type == 0) {
      ctx.save();
      ctx.globalAlpha = 0.5;
  }
  ctx.drawImage(piece.h, x, y, piece.dx, piece.dy);
  if (model.type == 0) {
      ctx.restore();
  }
}

})();
