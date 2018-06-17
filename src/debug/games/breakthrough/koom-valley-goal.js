(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "koom-valley-goal") {
      checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var winner = null;
  var stone  = null;
  _.each(design.allPositions(), function(pos) {
      if (stone === null) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.type == 0)) {
              stone = pos;
          }
      }
  });
  if (stone !== null) {
      if (design.inZone(0, 1, stone)) {
          winner = 1;
      } else {
          var cnt = 0;
          _.each(design.allDirections(), function(dir) {
              var p = design.navigate(board.player, stone, dir);
              if (p === null) return;
              var piece = board.getPiece(p);
              if (piece === null) return;
              if (piece.player == 2) cnt++;
          });
          if (cnt >= 3) winner = 2;
      }
  }
  if (winner !== null) {
      if (winner == player) {
          return 1;
      } else {
          return -1;
      }
  }
  return checkGoals(design, board, player);
}

})();
