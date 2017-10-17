(function() {

Dagaz.AI.AI_FRAME      = 2000;
Dagaz.AI.getForcedMove = Dagaz.AI.getCheckersForcedMove;

var strictMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "russian-checkers-extension") {
     checkVersion(design, name, value);
  }
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = design.price[piece.type];
          var bonus = 6;
          if (_.indexOf([1, 23, 24, 39, 40, 62], +pos) >= 0) {
              bonus -= 3;
          }
          if (_.indexOf([7, 8, 55, 56], +pos) >= 0) {
              bonus -= 4;
          }
          if (_.indexOf([3, 5, 17, 46, 58, 60], +pos) >= 0) {
              bonus -= 2;
          }
          if (design.inZone(1, player, pos)) {
              bonus += 4;
          }
          if ((piece.type == 1) && (_.indexOf([7, 14, 21, 28, 35, 42, 49, 56], +pos) >= 0)) {
              bonus += 2;
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
