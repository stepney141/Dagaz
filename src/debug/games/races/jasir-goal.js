(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "jasir-goal") {
     checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var ea = 0; var eg = 0;
  var fa = 0; var fg = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (piece.player != player) {
              ea++;
              if (design.inZone(1, piece.player, pos)) eg++;
          } else {
              fa++;
              if (design.inZone(1, piece.player, pos)) fg++;
          }
      }
  });
  if (ea < 1) {
      return 1;
  }
  if (fa < 1) {
      return -1;
  }
  if (ea == eg) {
      return -1;
  }
  if (fa == fg) {
      return 1;
  }
  return checkGoals(design, board, player);
}

})();
