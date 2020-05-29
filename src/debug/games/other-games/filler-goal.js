(function() {

Dagaz.Model.WIN_CNT = 1600;
Dagaz.AI.NOISE_FACTOR = 0;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "filler-goal") {
     checkVersion(design, name, value);
  }
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  return move.actions.length;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var f = 0; var e = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (piece.player > 2) return;
      if (piece.player == player) {
          f++;
      } else {
          e++;
      }
  });
  if (f > Dagaz.Model.WIN_CNT) return 1;
  if (e > Dagaz.Model.WIN_CNT) return -1;
  return checkGoals(design, board, player);
}

})();
