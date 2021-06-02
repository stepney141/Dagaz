(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "l-game-view") {
      checkVersion(design, name, value);
  }
}

var checkDir = function(design, board, player, pos, dir) {
  var p = design.navigate(1, pos, dir);
  if (p === null) return '0';
  var piece = board.getPiece(p);
  if (piece === null) return '0';
  if (piece.type == 0) return '0';
  if (piece.player != player) return '0';
  return '1';
}

var showPiece = Dagaz.View.showPiece;

Dagaz.View.showPiece = function(view, ctx, frame, pos, piece, model, x, y) {
  var design = Dagaz.Model.design;
  var board = Dagaz.Controller.app.board;
  if (model.type > 0) {
      var s = 'B';
      if (model.player > 1) {
          s = 'R';
      }
      s = s + checkDir(design, board, model.player, pos, 2); // w
      s = s + checkDir(design, board, model.player, pos, 1); // e
      s = s + checkDir(design, board, model.player, pos, 0); // s
      s = s + checkDir(design, board, model.player, pos, 3); // n
      var r = view.piece[s];
      if (r) {
          ctx.drawImage(r.h, x, y, r.dx, r.dy);
      }
  } else {
      showPiece(view, ctx, frame, pos, piece, model, x, y);
  }
}

})();
