(function() {

Dagaz.AI.AI_FRAME     = 5000;
Dagaz.AI.REP_DEEP     = 30;
Dagaz.AI.MAX_QS_LEVEL = 5;
Dagaz.AI.MAX_AB_VARS  = 1000;
Dagaz.AI.MAX_QS_VARS  = 100;
Dagaz.AI.STALEMATE    = 0;

var penalty = [
  [-500,-250,-100,   0,-100,-250,-500,
   -250,-100,   0,   0,   0,-100,-250,
   -100,   0,   0,   0,   0,   0,-100,
      0,   0,   0,   0,   0,   0,   0,
   -100,   0,   0,   0,   0,   0,-100, 
   -250,-100,   0,   0,   0,-100,-250, 
   -500,-250,-100,   0,-100,-250,-500 ],
  [1000, 800, 500, 100, 500, 800,1000,
    800, 500, 100,   0, 100, 500, 800,
    500, 100,   0,-100,   0, 100, 500,
    100,   0,-100,-200,-100,   0, 100,
    500, 100,   0,-100,   0, 100, 500, 
    800, 500, 100,   0, 100, 500, 800, 
   1000, 800, 500, 100, 500, 800,1000 ]
];

Dagaz.AI.getPrice = function(design, piece, pos) {
  var r = design.price[piece.type];
  r += penalty[piece.type][pos];
  return r;
}

Dagaz.AI.isMajorPiece = function(type) {
  return true;
}

Dagaz.AI.isRepDraw = function(board) {
  var z = board.zSign;
  for (var i = 0; i < Dagaz.AI.REP_DEEP; i++) {
       if (board.parent === null) return false;
       var pos = Dagaz.AI.getTarget(board.move);
       board = board.parent;
       if (board.zSign == z) return true;
       if (pos === null) continue;
       if (board.getPiece(pos) !== null) return false;
  }
  return true;
}

var checkAttacked = function(design, board, player, pos, dir, opp) {
  var p = design.navigate(player, pos, opp);
  if (p !== null) {
      var piece = board.getPiece(p);
      if (piece === null) return design.inZone(0, player, p);
      if (piece.player == player) return false;
  }
  p = design.navigate(player, pos, dir);
  if (p === null) return false;
  var r = false;
  _.each(design.allDirections, function(d) {
      if (d == opp) return;
      var q = design.navigate(player, p, d);
      if (q === null) return;
      var piece = board.getPiece(q);
      if (piece === null) return;
      if (piece.player != player) r = true;
  });
  return r;
}

var isAttacked = function(design, board, player, pos) {
  var piece = board.getPiece(pos);
  if (piece === null) return false;
  return checkAttacked(design, board, piece.player, pos, 0, 1) || // w, e
         checkAttacked(design, board, piece.player, pos, 2, 3) || // s, n
         checkAttacked(design, board, piece.player, pos, 1, 0) || // e, w
         checkAttacked(design, board, piece.player, pos, 3, 2);   // n, s
}

Dagaz.AI.see = function(design, board, move) {
  var pos = null;
  _.each(move.actions, function(a) {
      if (a[0] === null) return;
      if (a[1] === null) return;
      pos = a[0][0];
  });
  if (pos === null) return false;
  var piece = board.getPiece(pos);
  if (piece === null) return false;
  return piece.type == 0;
}

Dagaz.AI.inCheck = function(design, board) {
  if (_.isUndefined(board.inCheck)) {
      board.inCheck = false;
      var king = null;
      for (var pos = 0; pos < design.positions.length; pos++) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player == board.player) && (piece.type == 1)) {
              if (king !== null) return false;
              king = pos;
          }
      }
      if (king === null) return false;
      board.inCheck = isAttacked(design, board, board.player, king);
  }
  return board.inCheck;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  _.each(move.actions, function(a) {
      if (a[0] === null) return;
      if (a[1] !== null) return;
      var piece = board.getPiece(a[0][0]);
      if (piece !== null) {
          r += Dagaz.AI.getPrice(design, piece, a[0][0]) + 1000;
      }
  });
  return r;
}

Dagaz.AI.eval = function(design, params, board, player) {
  if (_.isUndefined(board.completeEval)) {
      board.completeEval = 0;
      _.each(design.allPositions(), function(pos) {
           var piece = board.getPiece(pos);
           if (piece === null) return;
           var v = Dagaz.AI.getPrice(design, piece, pos);
           if (isAttacked(design, board, piece.player, pos)) {
               v = (v / 2) | 0;
           }
           if (piece.player == board.player) {
               board.completeEval += v;
           } else {
               board.completeEval -= v;
           }
      });
  }
  if (board.player == 1) {
      board.completeEval += 600000;
  } else {
      board.completeEval -= 600000;
  }
  if (board.player == player) {
      return board.completeEval;
  } else {
      return -board.completeEval;
  }
}

})();
