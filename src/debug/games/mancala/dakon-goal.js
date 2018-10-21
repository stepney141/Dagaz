(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "dakon-goal") {
      checkVersion(design, name, value);
  }
}

var eval = Dagaz.AI.eval;

Dagaz.AI.eval = function(design, params, board, player) {
  var mobility = 0;
  var isForced = false;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.player == player)) {
          if (design.inZone(1, player, pos)) {
              if (+piece.getValue(0) < 0) isForced = true;
          } else {
              mobility++;
          }
      }
  });
  if (mobility == 0) return -1;
  if (isForced) return 10000;
  return eval(design, params, board, player) * 100 + mobility;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var f = 0; var e = 0; var s = 0;
  _.each(design.allPositions(), function(pos) {
      if (!design.inZone(1, player, pos)) {
          var piece = board.getPiece(pos);
          if (piece !== null) {
              var v = Math.abs(+piece.getValue(0));
              if (piece.player == player) {
                  f++;
                  s += v;
              } else {
                  e++;
                  s -= v;
              }
          }
      }
  });
  if ((f == 0) || (e == 0)) {
      var e = eval(design, [], board, player) + s;
      if (e > 0) {
          return 1;
      } 
      if (e < 0) {
          return -1;
      }
      return 0;
  }
  return checkGoals(design, board, player);
}

})();
