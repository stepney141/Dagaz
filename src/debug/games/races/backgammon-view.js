(function() {

Dagaz.View.MARK_R = 10;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "backgammon-view") {
      checkVersion(design, name, value);
  }
}

Dagaz.View.showPiece = function(view, ctx, frame, pos, piece, model, x, y) {
  var design = Dagaz.Model.design;
  var s = 30;
  if (design.inZone(4, 1, pos)) {
      y -= (frame.dy - piece.dy) / 2 | 0;
  } else {
      y += (frame.dy - piece.dy) / 2 | 0;
      s = -s;
  }
  var v = 1;
  if (model) {
      v = model.getValue(0);
      if ((v === null) || (v == 0)) v = 1;
  }
  for (var i = 0; i < v; i++) {
      ctx.drawImage(piece.h, x, y, piece.dx, piece.dy);
      if (model.type != 0) break;
      y += s;
  }
}

})();
