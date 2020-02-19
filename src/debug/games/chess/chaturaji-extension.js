(function() {

Dagaz.Model.passForcedDraw = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "chaturaji-extension") {
      checkVersion(design, name, value);
  }
}

var isFriend = function(a, b) {
  return Math.abs(a - b) == 2;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.mode < 2) return;
      var pos = move.actions[0][1][0];
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (isFriend(piece.player, board.player)) {
          move.failed = true;
          return;
      }
      move.addValue(board.player - 1, design.price[piece.type]);
      if (piece.type != 4) return;
      pos = design.navigate(board.player, 0, 8);
      while (pos !== null) {
          if (board.getPiece(pos) === null) {
              move.dropPiece(pos, piece.promote(9));
              return;
          }
          pos = design.navigate(board.player, pos, 8);
      }
  });
  _.each(board.moves, function(move) {
      if (move.mode != 1) return;
      var pos = move.actions[0][0][0];
      for (var p = Dagaz.Model.stringToPos("x1"); p < design.positions.length; p++) {
          if ((pos != p) && (board.getPiece(p) !== null)) {
               move.capturePiece(p);
          }
      }
  });
  CheckInvariants(board);
}

})();
