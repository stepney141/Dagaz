(function() {

Dagaz.AI.AI_FRAME = 1000;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "kono-extension") {
     checkVersion(design, name, value);
  }
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = 0;
          _.each(design.allDirections(), function(dir) {
              var p = design.navigate(player, pos, dir);
              if (p === null) {
                  v -= 5;
              } else {
                  var x = board.getPiece(p);
                  if ((x !== null) && (x.player == piece.player)) {
                      p = design.navigate(player, p, dir);
                      if (p !== null) {
                          x = board.getPiece(p);
                          if ((x !== null) && (x.player != piece.player)) {
                              v += 5;
                          }
                      }
                  }
              }
          });
          if (piece.player != player) {
              v = -v;
          }
          r += v;
      }
  });
  return r;
}

Dagaz.Model.checkGoals = function(design, board, player) {
  var enemies = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.player != player)) {
          enemies++;
      }
  });
  if (enemies < 2) {
      return 1;
  } else {
      return 0;
  }
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  if (move.actions.length > 0) {
      var pos = move.actions[0][1][0];
      if (board.getPiece(pos) !== null) {
          r += 10;
      }
  }
  return r;
}

})();
