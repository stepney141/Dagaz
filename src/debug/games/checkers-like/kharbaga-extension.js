(function() {

Dagaz.AI.AI_FRAME      = 1000;
Dagaz.AI.getForcedMove = Dagaz.AI.getCheckersForcedMove;

var strictMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "kharbaga-extension") {
     checkVersion(design, name, value);
  }
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = design.price[piece.type];
          var bonus = 8;
          if (_.indexOf([20, 0, 24, 4], +pos) >= 0) {
              bonus -= 5;
          }
          if (_.indexOf([37, 33, 29, 25, 38, 34, 30, 26, 39, 35, 31, 27, 40, 36, 32, 28], +pos) >= 0) {
              bonus -= 4;
          }
          if (_.indexOf([15, 10, 5, 21, 22, 23, 1, 2, 3, 19, 14, 9], +pos) >= 0) {
              bonus -= 3;
          }
          v += bonus;
          if (!Dagaz.AI.isFriend(player, piece.player)) {
              v = -v;
          }
          r += v;
      }
  });
  return r;
}

})();
