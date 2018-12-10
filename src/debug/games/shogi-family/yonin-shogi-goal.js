(function() {

Dagaz.AI.discardVector = [20, 3, 3, 3];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "yonin-shogi-goal") {
      checkVersion(design, name, value);
  }
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  _.each(move.actions, function(a) {
      if ((a[0] !== null) && (a[1] === null)) {
          var piece = board.getPiece(a[0][0]);
          if (piece !== null) {
              r += design.price[piece.type];
          }
      }
  });
  return r;
}

Dagaz.AI.getEval = function(design, board) {
  if (_.isUndefined(board.eval)) {
      board.eval = [0, 0, 0, 0];
      var kings  = [0, 0, 0, 0];
      _.each(design.allPositions(), function(pos) {
          var piece = board.getPiece(pos);
          if (piece !== null) {
              var v = design.price[piece.type];
              if (!design.inZone(0, board.player, pos)) {
                  v *= 2;
              }
              if (piece.type == 0) {
                  kings[piece.player - 1]++;
              }
              board.eval[piece.player - 1] += v;
          }
      });
      for (var p = 0; p < 4; p++) {
          if (kings[p] == 0) {
              board.eval[p] = 0;
          }
      }
  }
  return board.eval;
}

var getVal = function(current, player, val) {
  if (current == player) return val;
  return -val;
}

Dagaz.AI.eval = function(ai, design, board, player) {
  var r = 0;
  var eval = Dagaz.AI.getEval(design, board);
  for (var p = 0; p < 4; p++) {
      r += getVal(p + 1, player, eval[p]);
  }
  return r;
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

})();
