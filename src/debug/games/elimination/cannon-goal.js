(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "cannon-goal") {
     checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var enemies = 0;
  var friends = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == 1)) {
          if (piece.player != player) {
              enemies++;
          } else {
              friends++;
          }
      }
  });
  if ((enemies < 1) && (board.reserve[1][design.nextPlayer(player)] == 0)) {
      return 1;
  }
  if ((friends < 1) && (board.reserve[1][player] == 0)) {
      return -1;
  }
  return checkGoals(design, board, player);
}

})();
