(function() {

Dagaz.AI.discardVector = [0, 5, 5, 5, 3, 3, 3];

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "breakthrough-extension") {
     checkVersion(design, name, value);
  }
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  if (move.actions.length > 0) {
      var pos = move.actions[0][1][0];
      if (design.inZone(0, board.player, pos)) return 1000;
      if (board.getPiece(pos) !== null) return 10;
  }
  return 1;
}

var checkDir = function(design, board, player, pos, dir, v, owner) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return 0;
  var piece = board.getPiece(p);
  if (piece === null) return 0;
  if (piece.player != owner) return 0;
  return v;
}

Dagaz.AI.getEval = function(design, board) {
  var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
  var ne = design.getDirection("ne"); var se = design.getDirection("se");
  if (_.isUndefined(board.eval)) {
      board.eval = 0;
      _.each(design.allPositions(), function(pos) {
          var piece = board.getPiece(pos);
          if (piece !== null) {
              var v = design.price[piece.type];
              v += checkDir(design, board, piece.player, pos, nw, -1, design.nextPlayer(piece.player));
              v += checkDir(design, board, piece.player, pos, ne, -1, design.nextPlayer(piece.player));
              v += checkDir(design, board, piece.player, pos, sw, 1, piece.player);
              v += checkDir(design, board, piece.player, pos, se, 1, piece.player);
              if (piece.player != board.player) {
                  v = -v;
              }
              board.eval += v;
          }
      });
  }
  return board.eval;
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = Dagaz.AI.getEval(design, board);
  if (player != board.player) {
      r = -r;
  }
  return r;
}

})();
