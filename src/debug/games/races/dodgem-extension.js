(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "dodgem-extension") {
     checkVersion(design, name, value);
  }
}

Dagaz.Model.checkGoals = function(design, board, player) {
  var friends = 0;
  board.generate();
  if (board.moves.length == 0) {
      return -1;
  }
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.player == player)) {
          friends++;
      }
  });
  if (friends == 0) {
      return 1;
  } else {
      return 0;
  }
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  for (var i = 0; i < move.actions.length; i++) {
      if ((move.actions[i][0] !== null) && (move.actions[i][1] !== null)) {
           var d = move.actions[i][1][0] - move.actions[i][0][0];
           if ((board.player == 1) && (d < -1)) {
                r += 10;
           }
           if ((board.player == 2) && (d == 1)) {
                r += 10;
           }
      }
      if ((move.actions[i][0] !== null) && (move.actions[i][1] === null)) {
           r += 5;
      }
  }
  return r;
}

})();
