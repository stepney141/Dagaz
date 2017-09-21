(function() {

var strictMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "checkers-10x10-extension") {
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
          if (_.indexOf([108, 84, 60, 36, 22, 121, 142, 1], +pos) >= 0) {
              bonus -= 3;
          }
          if (_.indexOf([132, 12, 131, 11], +pos) >= 0) {
              bonus -= 4;
          }
          if (_.indexOf([118, 94, 70, 46, 25, 49, 73, 97, 134, 136, 138, 140, 3, 5, 7, 8], +pos) >= 0) {
              bonus -= 2;
          }
          if ((piece.type == 1) && (_.indexOf([132, 121, 110, 99, 88, 77, 66, 55, 44, 33, 22, 11], +pos) >= 0)) {
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
