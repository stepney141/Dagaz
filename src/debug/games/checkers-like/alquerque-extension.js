(function() {

var strictMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "alquerque-extension") {
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
          if (_.indexOf([20, 0, 24, 4, 15, 5, 21, 1, 23, 3, 19, 9], +pos) >= 0) {
              bonus -= 5;
          }
          if (_.indexOf([11, 17, 7, 13], +pos) >= 0) {
              bonus -= 4;
          }
          if (_.indexOf([10, 22, 2, 14], +pos) >= 0) {
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
