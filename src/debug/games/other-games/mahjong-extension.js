(function() {

Dagaz.View.MARK_R = 0;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "mahjong-extension") {
     checkVersion(design, name, value);
  }
}

var isBadMove = function(design, board, pos) {
  var p = pos + Dagaz.Model.WIDTH * Dagaz.Model.HEIGHT;
  if (p < design.positions.length) {
      if (board.getPiece(p) !== null) return true;
  }
  var r = true;
  p = design.navigate(1, pos, 1);
  if ((p === null) || (board.getPiece(p) === null)) {
      r = false;
  }
  p = design.navigate(1, pos, 2);
  if ((p === null) || (board.getPiece(p) === null)) {
      r = false;
  }
  return r;
}

Dagaz.View.showPiece = function(view, ctx, frame, pos, piece, model, x, y) {
  var val = null;
  if (model) {
      val = model.getValue(0);
  }
  if ((val !== null) && (val > 0)) {
      ctx.save();
      ctx.globalAlpha = 0.75;
  }
  ctx.drawImage(piece.h, x, y, piece.dx, piece.dy);
  if (val !== null) {
      ctx.restore();
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var pos = move.actions[0][0][0];
      if (isBadMove(design, board, pos)) {
          move.failed = true;
          return;
      }
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var f = true;
          if (!_.isUndefined(board.move)) {
              var p = board.move.actions[0][0][0];             
              var t = board.getPiece(p);
              if (p == pos) {
                  move.failed = true;
                  return;
              }
              if ((t !== null) && (t.type == piece.type)) {
                  move.capturePiece(p);
                  f = false;
              }
          }
          if (f) {
              piece = piece.setValue(0, 1);
              move.actions = [];
              move.movePiece(pos, pos, piece);
              if (!_.isUndefined(board.move)) {
                  pos = board.move.actions[0][0][0];
                  piece = board.getPiece(pos);
                  if (piece !== null) {
                      piece = piece.setValue(0, 0);
                      move.movePiece(pos, pos, piece);
                  }
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
