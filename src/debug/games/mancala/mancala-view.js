(function() {

Dagaz.View.DX = 5;
Dagaz.View.DY = 0;
Dagaz.View.MX = 26;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "mancala-view") {
      checkVersion(design, name, value);
  }
}

var showPiece = Dagaz.View.showPiece;

Dagaz.View.showPiece = function(view, ctx, frame, pos, piece, model, x, y) {
  var val = null;
  if (model) {
      val = model.getValue(0);
  }
  if (val) {
      var dx = frame.dx; var dy = frame.dy;
      var cx = (dx / piece.dx) | 0;
      var cy = (dy / piece.dy) | 0;
      var sx = x + Dagaz.View.DX - (dx - piece.dx) / 2 | 0;
      var sy = y + Dagaz.View.DY + (cy - 1) * piece.dy - (dy - piece.dy) / 2 | 0;
      var ov = 0;
      if (val > cx * cy) {
          ov = val - cx * cy;
          val = cx * cy;
      }
      for (var cn = 0; val > 0; val--) {
          ctx.drawImage(piece.h, sx, sy, piece.dx, piece.dy);
          if (cn < cx - 1) {
              sx += piece.dx;
              cn++;
          } else {
              sx -= piece.dx * (cx - 1);
              sy -= piece.dy;
              cn = 0;
          }
      }
      var sx = x + Dagaz.View.DX - (dx - piece.dx) / 2 + (piece.dx / 2) | 0;
      var sy = y + Dagaz.View.DY + (cy - 1) * piece.dy - (dy - piece.dy) / 2 - (piece.dy / 2) | 0;
      for (var cn = 0; ov > 0; ov--) {
          ctx.drawImage(piece.h, sx, sy, piece.dx, piece.dy);
          if (cn < cx - 2) {
              sx += piece.dx;
              cn++;
          } else {
              sx -= piece.dx * (cx - 2);
              sy -= piece.dy;
              cn = 0;
          }
      }
  } else {
      showPiece(view, ctx, frame, pos, piece, model, x, y);
  }
}

})();
