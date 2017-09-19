(function() {

var strictMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "80-cells-checkers-extension") {
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
          if (_.indexOf([50, 30, 49, 29, 18, 61, 78, 1], +pos) >= 0) {
              bonus -= 3;
          }
          if (_.indexOf([10, 69, 70, 9], +pos) >= 0) {
              bonus -= 4;
          }
          if (_.indexOf([58, 38, 41, 21, 72, 74, 76, 3, 5, 7], +pos) >= 0) {
              bonus -= 2;
          }
          if (design.inZone(1, player, pos)) {
              bonus += 4;
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
