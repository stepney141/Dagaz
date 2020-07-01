(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "ttc-goal") {
      checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  board.generate(design);
  if (board.moves.length == 0) {
      var list = Dagaz.Model.findPiece(design, board, board.player, [5, 11]);
      if (list.length == 0) return 1;
      if (Dagaz.Model.checkPositions(design, board, board.player, list)) {
          return 1;
      } else {
          return 0;
      }
  }
  return checkGoals(design, board, player);
}

})();
