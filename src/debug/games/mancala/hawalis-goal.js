(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "hawalis-goal") {
      checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var f = 0; var e = 0;
  _.each(design.allPositions(), function(pos) {
      if (design.inZone(0, board.player, pos)) return;
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var cnt = piece.getValue(0);
          if (cnt !== null) {
              if (piece.player == player) {
                  f += Math.abs(+cnt);
              } else {
                  e += Math.abs(+cnt);
              }
          }
      }
  });
  if (e == 0) return 1;
  if (f == 0) return -1;
  return checkGoals(design, board, player);
}

})();
