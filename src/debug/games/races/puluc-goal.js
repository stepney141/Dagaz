(function() {

var penalty = [40, 60, 40, 10, 10];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "puluc-goal") {
      checkVersion(design, name, value);
  }
}

var isEnemy = function(design, board, player, pos) {
  var r = false;
  var p = design.navigate(1, pos, 0);
  while (p !== null) {
      var piece = board.getPiece(p);
      if (piece !== null) {
          r = (piece.player != player);
      }
      p = design.navigate(1, p, 0);
  }
  return r;
}

Dagaz.AI.eval = function(design, board, player) {
  var r = 500;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (piece.type != 2) return;
      var v = 100;
      if (!design.inZone(1, piece.player, pos)) {
          var p = design.navigate(1, pos, 0);
          if ((p !== null) && (board.getPiece(p) !== null)) {
              v = 10;
          } else {
              p = design.navigate(1, pos, 2);
              for (var ix = 0; ix < penalty.length; ix++) {
                  if (p === null) break;
                  if (design.inZone(1, piece.player, p)) break;
                  if (isEnemy(design, board, piece.player, p)) {
                      v -= penalty[ix];
                  }
                  p = design.navigate(1, p, 2);
              }
          }
      }
      if (piece.player != player) v = -v;
      r += v;
  });
  return r;
}

})();
