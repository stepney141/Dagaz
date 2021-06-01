(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "l-game-view") {
      checkVersion(design, name, value);
  }
}

var showPiece = Dagaz.View.showPiece;

Dagaz.View.showPiece = function(view, ctx, frame, pos, piece, model, x, y) {
  if (model.type > 0) {
      var s = 'B';
      if (model.player > 1) {
          s = 'R';
      }
      var r = view.piece[s + "0011"];

      if (r) {
          ctx.drawImage(r.h, x, y, r.dx, r.dy);
      }
  } else {
      showPiece(view, ctx, frame, pos, piece, model, x, y);
  }
}

})();
