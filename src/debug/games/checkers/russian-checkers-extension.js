(function() {

Dagaz.AI.discardVector = [0, 0, 5, 5, 5, 5];

Dagaz.AI.AI_FRAME      = 3000;
Dagaz.AI.MIN_DEEP      = 6;

var strictMode = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "russian-checkers-extension") {
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
  var s = null;
  var d = null;
  var p = null;
  _.each(move.actions, function(a) {
      if ((a[0] !== null) && (a[1] !== null)) {
          if (s === null) s = a[0][0];
          d = a[1][0];
          if (a[2] !== null) p = a[2][0];
      }
  });
  if (p.type > 0) return 10;
  if ((s !== null) && (d !== null)) {
      var nw = design.getDirection("nw"); var sw = design.getDirection("sw");
      var ne = design.getDirection("ne"); var se = design.getDirection("se");
      var cn = 0;
      if (isAttacked(design, board, d, s, nw, se)) cn++;
      if (isAttacked(design, board, d, s, ne, sw)) cn++;
      if (isAttacked(design, board, d, s, sw, ne)) cn++;
      if (isAttacked(design, board, d, s, se, nw)) cn++;
      if (move.actions > 1) {
          if (cn == 0) return 2;
      } else {
          if (cn == 1) return 3;
          return 2;
      }
  }
  return 1;
}

Dagaz.AI.getEval = function(design, board) {
  if (_.isUndefined(board.eval)) {
      board.eval = 0;
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
              if (design.inZone(1, board.player, pos)) {
                  bonus += 4;
              } 
              if ((piece.type == 1) && (_.indexOf([7, 14, 21, 28, 35, 42, 49, 56], +pos) >= 0)) {
                  bonus += 2;
              }
              v += bonus;
              if (!Dagaz.AI.isFriend(board.player, piece.player)) {
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
  if (!Dagaz.AI.isFriend(player, board.player)) {
      r = -r;
  }
  return r;
}

})();
