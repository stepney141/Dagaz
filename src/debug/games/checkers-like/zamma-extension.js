(function() {

Dagaz.AI.AI_FRAME      = 1000;
Dagaz.AI.getForcedMove = Dagaz.AI.getCheckersForcedMove;

var strictMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "zamma-extension") {
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
      var n = design.getDirection("n"); var nw = design.getDirection("nw"); 
      var s = design.getDirection("s"); var sw = design.getDirection("sw");
      var w = design.getDirection("w"); var ne = design.getDirection("ne"); 
      var e = design.getDirection("e"); var se = design.getDirection("se");
      var sr = move.actions[0][0][0];   var ds = move.actions[0][1][0];
      if (isAttacked(design, board, ds, sr, nw, se) ||
          isAttacked(design, board, ds, sr, ne, sw) ||
          isAttacked(design, board, ds, sr, se, nw) ||
          isAttacked(design, board, ds, sr, sw, ne) ||
          isAttacked(design, board, ds, sr,  n,  s) ||
          isAttacked(design, board, ds, sr,  s,  n) ||
          isAttacked(design, board, ds, sr,  w,  e) ||
          isAttacked(design, board, ds, sr,  e,  w)) {
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
          var bonus = 8;
          if (_.indexOf([72, 63, 45, 27, 9, 0, 80, 71, 53, 35, 17, 8, 73, 75, 77, 79, 1, 3, 5, 7], +pos) >= 0) {
              bonus -= 5;
          }
          if (_.indexOf([55, 37, 19, 65, 47, 29, 11, 57, 39, 21, 67, 49, 31, 13, 59, 41, 23, 69, 51, 33, 15, 61, 43, 25], +pos) >= 0) {
              bonus -= 4;
          }
          if (_.indexOf([54, 36, 18, 62, 44, 26, 74, 76, 78, 2, 4, 6], +pos) >= 0) {
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
