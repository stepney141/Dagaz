(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "sovereign-chess-invariant") {
     checkVersion(design, name, value);
  }
}

var applyMoves = function(desing, board, move) {
  var undo = Dagaz.Model.createMove(0);
  _.each(move.actions, function(a) {
      if (a[1] === null) {
          if (a[0] !== null) {
              board.setPiece(a[0][0], null);
          }
          return;
      }
      if (a[2] === null) return;
      if (a[0] === null) {
          board.setPiece(a[1][0], a[2][0]);
          return;
      }
      undo.movePiece(a[1][0], a[0][0], a[2][0]);
      var piece = board.getPiece(a[1][0]);
      if (piece !== null) {
          undo.dropPiece(a[1][0], piece);
      }
      board.setPiece(a[1][0], a[2][0]);
      board.setPiece(a[0][0], null);
  });
  return undo;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var player = board.getValue(board.player);
  if (player === null) {
      player = board.player;
  }
  var king = null;
  _.each(design.allPositions(), function(pos) {
      if (king !== null) return;
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (piece.player != player) return;
      if (piece.type != 5) return;
      king = pos;
  });
  if (king !== null) {
      // TODO: Check invariant and castling

  }
  CheckInvariants(board);
}

})();
