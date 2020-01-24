(function() {

Dagaz.AI.AI_FRAME     = 3000;
Dagaz.AI.REP_DEEP     = 10;
Dagaz.AI.MAX_QS_LEVEL = 5;
Dagaz.AI.STALEMATE    = -1;

var penalty = [
  [   0, 500, 450, 500,   0,
      0, 200, 150, 200,   0,
      0, 100,  50, 100,   0,
      0,   0,   0,   0,   0  ],
  [ 200,   0,   0,   0, 200,
    200, 100, 150, 100, 200,
    200,  50, 100,  50, 200,
    200, -20, -20, -20, 200  ],
  [ 200,   0,   0,   0, 200,
    200,  30, 120,  30, 200,
    200,  30, 100,  30, 200,
    200,   0,   0,   0, 200  ],
  [ 200,  20,  20,  20, 200,
    200,  50, 120,  50, 200,
    200,  20, 100,  20, 200,
    200,   0,   0,   0, 200  ],
  [   0,  50,  50,  50,   0,
      0, 100, 150, 100,   0,
      0,  50, 100,  50,   0,
      0,   0,   0,   0,   0  ]
];

Dagaz.AI.getPrice = function(design, piece, pos) {
  var r = design.price[piece.type];
  if (piece.player == 1) {
      r += penalty[piece.type][pos];
  } else {
      r += penalty[piece.type][19 - pos];
  }
  return r;
}

Dagaz.AI.isMajorPiece = function(type) {
  return type > 1;
}

Dagaz.AI.isRepDraw = function(board) {
  var z = board.zSign;
  for (var i = 0; i < Dagaz.AI.REP_DEEP; i++) {
       if (board.parent === null) return false;
       board = board.parent;
       if (board.zSign == z) return true;
  }
  return false;
}

var checkStep = function(design, board, player, pos, dir, types) {
  var p = design.navigate(player, pos, dir);
  if  (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == player) return false;
  return _.indexOf(types, +piece.type) >= 0;
}

var isAttacked = function(design, board, player, pos) {
  return checkStep(design, board, player, pos, 1, [0, 1, 3, 4]) || // n
         checkStep(design, board, player, pos, 2, [0, 3, 4])    || // s
         checkStep(design, board, player, pos, 3, [0, 3, 4])    || // e
         checkStep(design, board, player, pos, 4, [0, 3, 4])    || // w
         checkStep(design, board, player, pos, 5, [0, 2, 4])    || // ne
         checkStep(design, board, player, pos, 7, [0, 2, 4])    || // nw
         checkStep(design, board, player, pos, 6, [0, 2])       || // sw
         checkStep(design, board, player, pos, 8, [0, 2]);         // se
}

Dagaz.AI.see = function(design, board, move) {
  if (move.actions.length > 0) return false;
  var pos = move.actions[0][0][0];
  var piece = board.getPiece(pos);
  if (piece === null) return false;
  pos = move.actions[0][1][0];
  var target = board.getPiece(pos);
  if (target === null) return false;
  if (!isAttacked(design, board, piece.player, pos)) return true;
  return Dagaz.AI.getPrice(design, target, pos) >= Dagaz.AI.getPrice(design, piece, pos);
}

Dagaz.AI.inCheck = function(design, board) {
  if (_.isUndefined(board.inCheck)) {
      board.inCheck = false;
      var king = null;
      for (var pos = 0; pos < design.positions.length; pos++) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player == board.player) && (piece.type == 0)) {
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
  if (move.actions.length > 0) {
      var pos = move.actions[0][1][0];
      var piece = board.getPiece(pos);
      if (piece !== null) {
          r += Dagaz.AI.getPrice(design, piece, pos);
      }
  }
  return r;
}

Dagaz.AI.eval = function(design, params, board, player) {
  if (_.isUndefined(board.completeEval)) {
      board.completeEval = 0;
      _.each(design.allPositions(), function(pos) {
           var piece = board.getPiece(pos);
           if (piece === null) return;
           var v = Dagaz.AI.getPrice(design, piece, pos);
           if (piece.player == board.player) {
               board.completeEval += v;
           } else {
               board.completeEval -= v;
           }
      });
  }
  if (board.player == player) {
      return board.completeEval;
  } else {
      return -board.completeEval;
  }
}

})();
