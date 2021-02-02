(function() {

Dagaz.AI.AI_FRAME     = 2000;
Dagaz.AI.REP_DEEP     = 30;
Dagaz.AI.MAX_QS_LEVEL = 1;
Dagaz.AI.STALEMATE    = -1;

var penalty = [
    [   0,   0,  40,   0,   0,   0,  40,   0,   0,    // Soldier
        0,  10,  50,  40,  40,  40,  50,  10,   0,
       10,  20,  30,  30,  30,  30,  30,  20,  10,
        5,  10,  10,  20,  20,  20,  10,  10,   5,
        5,   5,   5,  10,  10,  10,   5,   5,   5,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        5,   0,   5,   0,   5,   0,   5,   0,   5,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0 ],

    [-200,-100, -50, -50, -50, -50, -50,-100,-200,    // Horse
     -100, -25, -10,   0,   0,   0, -10, -25,-100,
      -50, -10,  10,  20,  20,  20,  10, -10, -50,
      -50,   0,  40,  50,  50,  50,  40,   0, -50,
      -50,   0,  15,  60,  60,  60,  15,   0, -50,
      -50,   0,  15,  60,  60,  60,  15,   0, -50,
      -50,   0,  10,  20,  20,  20,  10,   0, -50,
      -50, -10,   0,   0,   0,   0,   0, -10, -50,
     -100, -25, -10, -10, -10, -10, -10, -25,-100,
     -200, -50, -25, -25, -25, -25, -25, -50,-200 ],

    [   0,   0,   0,   0,   0,   0,   0,   0,   0,    // Elephant
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,  20,   0,   0,   0,  20,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
       10,   0,   0,   0,  50,   0,   0,   0,  10,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,  30,   0,   0,   0,  30,   0,   0 ],

    [ -10, -10, -60, -10, -10, -10, -60, -10, -10,    // Chariot
       40,  70,  60,  10,  10,  10,  60,  70,  40,
      -60,  20,  10,   0, -30,   0,  10,  20, -60,
      -60,   0,   0,  30,  30,  30,   0,   0,   0,
      -60,   0,   0,  30,  30,  30,   0,   0,   0,
      -60,   0,   0,  30,  30,  30,   0,   0,   0,
      -60,   0,   0,  30,  30,  30,   0,   0,   0,
      -60,   0,   0,  10,  10,  10,   0,   0,   0,
      -60,   0,   0,   0,   0,   0,   0,   0, -60,
      -60,   0,   0, -10, -10, -10,   0,   0, -60 ],

    [ -10, -10, -60, -10, -10, -10, -60, -10, -10,    // Cannon
       40,  70,  60,  10,  10,  10,  60,  70,  40,
      -60,  20,  10,   0, -30,   0,  10,  20, -60,
      -60,   0,   0,  30,  30,  30,   0,   0,   0,
      -60,   0,   0,  30,  30,  30,   0,   0,   0,
      -60,   0,   0,  30,  30,  30,   0,   0,   0,
      -60,   0,   0,  30,  30,  30,   0,   0,   0,
      -60,   0,   0,  10,  10,  10,   0,   0,   0,
      -60,   0,   0,   0,   0,   0,   0,   0, -60,
      -60,   0,   0, -10, -10, -10,   0,   0, -60 ],
 
    [   0,   0,   0,   0,   0,   0,   0,   0,   0,    // Advisor
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,  10,   0,  10,   0,   0,   0,
        0,   0,   0,   0,  20,   0,   0,   0,   0,
        0,   0,   0,  10,   0,  10,   0,   0,   0 ],

    [   0,   0,   0,   0,   0,   0,   0,   0,   0,    // General
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,   0,   0,   0,   0,   0,   0,
        0,   0,   0,  10,  10,  10,   0,   0,   0,
        0,   0,   0,  20,  30,  20,   0,   0,   0,
        0,   0,   0,  10,  20,  10,   0,   0,   0 ]
];

Dagaz.AI.getPrice = function(design, piece, pos) {
  var r = design.price[piece.type];
  if (piece.player == 1) {
      r += penalty[piece.type][pos];
  } else {
      r += penalty[piece.type][89 - pos];
  }
  return r;
}

Dagaz.AI.isMajorPiece = function(type) {
  return type < 6;
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

var checkStep = function(design, board, player, pos, dir) {
  var p = design.navigate(player, pos, dir);
  if  (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == player) return false;
  if (piece.type != 0) return false;
  return true;
}

var checkSlide = function(design, board, player, pos, dir) {
  var p = design.navigate(player, pos, dir);
  if  (p === null) return false;
  var piece = board.getPiece(p);
  while (piece === null) {
      p = design.navigate(player, p, dir);
      if  (p === null) return false;
      piece = board.getPiece(p);
  }
  if ((piece.player != player) && (piece.type == 3)) return true;
  p = design.navigate(player, p, dir);
  if  (p === null) return false;
  piece = board.getPiece(p);
  while (piece === null) {
      p = design.navigate(player, p, dir);
      if  (p === null) return false;
      piece = board.getPiece(p);
  }
  if (piece.player == player) return false;
  if (piece.type != 4) return false;
  return true;
}

var checkJump = function(design, board, player, pos, d, o) {
  var p = design.navigate(player, pos, d);
  if  (p === null) return false;
  if (board.getPiece(p) !== null) return false;
  p = design.navigate(player, p, o);
  if  (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == player) return false;
  if (piece.type != 1) return false;
  return true;
}

var isAttacked = function(design, board, player, pos) {
  return checkStep(design, board, player, pos, 4)    || // n
         checkStep(design, board, player, pos, 0)    || // w
         checkStep(design, board, player, pos, 1)    || // e
         checkSlide(design, board, player, pos, 0)   || // w
         checkSlide(design, board, player, pos, 1)   || // e
         checkSlide(design, board, player, pos, 2)   || // s
         checkSlide(design, board, player, pos, 4)   || // n
         checkJump(design, board, player, pos, 3, 4) || // ne, n
         checkJump(design, board, player, pos, 3, 1) || // ne, e
         checkJump(design, board, player, pos, 5, 2) || // se, s
         checkJump(design, board, player, pos, 5, 1) || // se, e
         checkJump(design, board, player, pos, 6, 2) || // sw, s
         checkJump(design, board, player, pos, 6, 0) || // sw, w
         checkJump(design, board, player, pos, 7, 0) || // nw, w
         checkJump(design, board, player, pos, 7, 4);   // nw, n
}

Dagaz.AI.see = function(design, board, move) {
  if (!move.isSimpleMove()) return false;
  var pos = move.actions[0][0][0];
  var piece = board.getPiece(pos);
  if (piece === null) return false;
  pos = move.actions[0][1][0];
  var target = board.getPiece(pos);
  if (target === null) return false;
  if (!isAttacked(design, board, piece.player, pos)) return true;
  return Dagaz.AI.getPrice(design, target, pos) > Dagaz.AI.getPrice(design, piece, pos);
}

/*Dagaz.AI.inCheck = function(design, board) {
  if (_.isUndefined(board.inCheck)) {
      board.inCheck = false;
      var king = null;
      for (var pos = 0; pos < design.positions.length; pos++) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player == board.player) && (piece.type == 6)) {
              if (king !== null) return false;
              king = pos;
          }
      }
      if (king === null) return false;
      board.inCheck = isAttacked(design, board, board.player, king);
  }
  return board.inCheck;
}*/

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  if (move.isSimpleMove()) {
      var pos = move.actions[0][1][0];
      var piece = board.getPiece(pos);
      if (piece !== null) {
          r += Dagaz.AI.getPrice(design, piece, pos);
          pos = move.actions[0][0][0];
          piece = board.getPiece(pos);
          if (piece !== null) {
              r -= Dagaz.AI.getPrice(design, piece, pos);
          }
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
