(function() {

Dagaz.AI.AI_FRAME      = 1000;
Dagaz.AI.getForcedMove = Dagaz.AI.getCheckersForcedMove;

var strictMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "checkers-10x10-extension") {
     checkVersion(design, name, value);
  }
}

var isAttacked = function(design, board, pos, empty, dir, opposite) {
  var p = design.navigate(board.player, pos, dir);
  if ((p === null) || (p == empty)) return false;
  var piece = board.getPiece(p);
  if ((p === null) || (p.player == board.player)) return false;
  p = design.navigate(board.player, pos, opposite);
  if (p === null) return false;
  return (p == empty) || (board.getPiece(p) === null);
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  if ((move.actions.length == 1) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null)) {
      var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
      var ne = design.getDirection("ne"); var se = design.getDirection("se");
      var sr = move.actions[0][0][0];
      var ds = move.actions[0][1][0];
      if (isAttacked(design, board, ds, sr, nw, se) ||
          isAttacked(design, board, ds, sr, ne, sw) ||
          isAttacked(design, board, ds, sr, se, nw) ||
          isAttacked(design, board, ds, sr, sw, ne)) {
          return 3;
      }
  }
  return 1;
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = design.price[piece.type];
          var bonus = 6;
          if (_.indexOf([70, 50, 30, 69, 49, 29, 19, 81, 99, 1], +pos) >= 0) {
              bonus -= 3;
          }
          if (_.indexOf([90, 10, 89, 9], +pos) >= 0) {
              bonus -= 4;
          }
          if (_.indexOf([79, 59, 39, 21, 41, 61, 92, 94, 96, 3, 5, 7], +pos) >= 0) {
              bonus -= 2;
          }
          if ((piece.type == 1) && (_.indexOf([90, 81, 72, 63, 54, 45, 36, 27, 18, 9], +pos) >= 0)) {
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
