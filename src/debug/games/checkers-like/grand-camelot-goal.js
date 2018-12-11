(function() {

var win = 2;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "grand-camelot-goal") {
      win = +value;
  } else {
      checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var f = [0, 0, 0, 0]; var g = [0, 0, 0, 0];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (design.inZone(0, piece.player, pos)) {
              g[piece.player - 1]++;
          }
          f[piece.player - 1]++;
      }
  });
  for (var p = 0; p < 4; p++) {
      var r = null;
      if (g[p] >= win) r = 1;
      if (f[p] < win) r = -1;
      if (r !== null) {
          if (p + 1 == player) {
              return r;
          } else {
              return -r;
          }
      }
  }
  if ((f[0] < win) && (f[1] < win) && (f[2] < win) && (f[3] < win)) return 0;
  return checkGoals(design, board, player);
}

})();
