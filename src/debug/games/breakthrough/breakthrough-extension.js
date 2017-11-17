(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "breakthrough-extension") {
     checkVersion(design, name, value);
  }
}

var checkDir = function(design, board, player, pos, dir, v, owner) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return 0;
  var piece = board.getPiece(p);
  if (piece === null) return 0;
  if (piece.player != owner) return 0;
  return v;
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = design.price[piece.type];
          v += checkDir(design, board, piece.player, pos, nw, -1, design.nextPlayer(piece.player));
          v += checkDir(design, board, piece.player, pos, ne, -1, design.nextPlayer(piece.player));
          v += checkDir(design, board, piece.player, pos, sw, 1, piece.player);
          v += checkDir(design, board, piece.player, pos, se, 1, piece.player);
          if (piece.player != player) {
              v = -v;
          }
          r += v;
      }
  });
  return r;
}

})();
