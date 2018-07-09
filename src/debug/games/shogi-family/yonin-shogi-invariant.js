(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "yonin-shogi-invariant") {
      checkVersion(design, name, value);
  }
}

var heuristic = Dagaz.AI.heuristic;

Dagaz.AI.heuristic = function(ai, design, board, move) {
  if (move.isSimpleMove()) {
      var king  = design.getPieceType("King");
      var pos   = move.actions[0][0][0];
      var piece = board.getPiece(pos);
      if (!design.inZone(0, board.player, pos) && (piece !== null) && (piece.type == king)) {
          var cnt = 0;
          _.each(design.allPositions(), function(pos) {
              if (design.inZone(0, board.player, pos)) {
                  var piece = board.getPiece(pos);
                  if ((piece !== null) && (piece.player == board.player) && (piece.type == king)) cnt++;
              }
          });
          if (cnt > 0) return -1;
      }
  }
  return heuristic(ai, design, board, move);
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var kings  = 0;
  var noKing = true;
  var king = design.getPieceType("King");
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == king)) {
          if (piece.player == player) {
              kings++;
          }
          if (piece.player == 1) {
              noKing = false;
          }
      }
  });
  if (noKing || (kings == 4)) {
      return 1;
  }
  return checkGoals(design, board, player);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var king = design.getPieceType("King");
  var f = true;
  _.each(design.allPositions(), function(pos) {
      if (f) {
         if (design.inZone(0, board.player, pos)) {
             var piece = board.getPiece(pos);
             if ((piece !== null) && (piece.player == board.player) && (piece.type == king)) f = false;
         }
      }
  });
  if (f) {
      _.each(board.moves, function(move) {
         if ((move.actions.length == 0) || (move.actions[0][0] === null)) {
             move.failed = true;
             return;
         }
         var pos = move.actions[0][0][0];
         if (design.inZone(0, board.player, pos)) {
             move.failed = true;
             return;
         }
         var piece = board.getPiece(pos);
         if ((piece === null) || (piece.type != king)) {
             move.failed = true;
         }
      });
  }
  CheckInvariants(board);
}

})();
