(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "klondike-extension") {
     checkVersion(design, name, value);
  }
}

var badColors = function(a, b) {
  return (a % 2) + (b % 2) != 1;
}

var moveTail = function(design, board, from, to, move) {
  var p = design.navigate(board.player, from, 0);
  var q = design.navigate(board.player, to, 0);
  if ((p === null) || (q === null) || (board.getPiece(q) !== null)) {
      move.failed = true;
      return;
  }
  var piece = board.getPiece(p);
  while (piece !== null) {
      move.movePiece(p, q, piece);
      p = design.navigate(board.player, p, 0);
      q = design.navigate(board.player, q, 0);
      if ((p === null) || (q === null) || (board.getPiece(q) !== null)) {
          move.failed = true;
          return;
      }
      piece = board.getPiece(p);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.mode == 0) {
          var p = design.navigate(board.player, move.actions[0][0][0], 0);
          if ((p !== null) && (board.getPiece(p) !== null)) {
              move.failed = true;
          }
      }
      if (move.mode == 1) {
          var pos = move.actions[0][0][0];
          var piece = board.getPiece(pos);
          if (piece !== null) {
              var p = design.navigate(board.player, move.actions[0][1][0], 1);
              if (p === null) {
                  if (piece.type != 25) {
                      move.failed = true;
                      return;
                  }
              } else {
                  var t = board.getPiece(p);
                  if ((t === null) || (piece.type + 2 != t.type) || badColors(piece.player, t.player)) {
                      move.failed = true;
                      return;
                  }
              }
              moveTail(design, board, move.actions[0][0][0], move.actions[0][1][0], move);
          }
      }
  });
  CheckInvariants(board);
}

})();
