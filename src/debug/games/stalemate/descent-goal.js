(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "descent-goal") {
      checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var f = false;
  _.each(design.allPositions(), function(pos) {
      if (design.inZone(0, 2, pos)) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player == 2)) f = true;
      }
  });
  if (f) {
      if (player == 1) {
          return -1;
      } else {
          return 1;
      }
  }
  return checkGoals(design, board, player);
}

})();
