(function() {

Dagaz.AI.AI_FRAME     = 2000;
Dagaz.AI.REP_DEEP     = 30;
Dagaz.AI.MAX_QS_LEVEL = 3;
Dagaz.AI.MAX_AB_VARS  = 30;
Dagaz.AI.MAX_QS_VARS  = 3;
Dagaz.AI.STALEMATE    = 0;

var penalty = [
  [   0,   0,   0,   0,   0,   0,   0,   0,
    -25, 105, 135, 270, 270, 135, 105, -25,
    -80,   0,  30, 176, 176,  30,   0, -80,
    -85,  -5,  25, 175, 175,  25,  -5, -85,
    -90, -10,  20, 125, 125,  20, -10, -90,
    -95, -15,  15,  75,  75,  15, -15, -95, 
   -100, -20,  10,  70,  70,  10, -20,-100, 
      0,   0,   0,   0,   0,   0,   0,   0 ],
  [   0,   0,   0,   0,   0,   0,   0,   0,
    -25, 105, 135, 270, 270, 135, 105, -25,
    -80,   0,  30, 176, 176,  30,   0, -80,
    -85,  -5,  25, 175, 175,  25,  -5, -85,
    -90, -10,  20, 125, 125,  20, -10, -90,
    -95, -15,  15,  75,  75,  15, -15, -95, 
   -100, -20,  10,  70,  70,  10, -20,-100, 
      0,   0,   0,   0,   0,   0,   0,   0 ],
  [ -60, -30, -10,  20,  20, -10, -30, -60,
     40,  70,  90, 120, 120,  90,  70,  40,
    -60, -30, -10,  20,  20, -10, -30, -60,
    -60, -30, -10,  20,  20, -10, -30, -60,
    -60, -30, -10,  20,  20, -10, -30, -60,
    -60, -30, -10,  20,  20, -10, -30, -60,
    -60, -30, -10,  20,  20, -10, -30, -60,
    -60, -30, -10,  20,  20, -10, -30, -60 ],
  [-200,-100, -50, -50, -50, -50,-100,-200,
   -100,   0,   0,   0,   0,   0,   0,-100,
    -50,   0,  60,  60,  60,  60,   0, -50,
    -50,   0,  30,  60,  60,  30,   0, -50,
    -50,   0,  30,  60,  60,  30,   0, -50,
    -50,   0,  30,  30,  30,  30,   0, -50,
   -100,   0,   0,   0,   0,   0,   0,-100,
   -200, -50, -25, -25, -25, -25, -50,-200 ],
  [ -50, -50, -25, -10, -10, -25, -50, -50,
    -50, -25, -10,   0,   0, -10, -25, -50,
    -25, -10,   0,  25,  25,   0, -10, -25,
    -10,   0,  25,  40,  40,  25,   0, -10,
    -10,   0,  25,  40,  40,  25,   0, -10,
    -25, -10,   0,  25,  25,   0, -10, -25,
    -50, -25, -10,   0,   0, -10, -25, -50,
    -50, -50, -25, -10, -10, -25, -50, -50 ],
  [ -50, -50, -25, -10, -10, -25, -50, -50,
    -50, -25, -10,   0,   0, -10, -25, -50,
    -25, -10,   0,  25,  25,   0, -10, -25,
    -10,   0,  25,  40,  40,  25,   0, -10,
    -10,   0,  25,  40,  40,  25,   0, -10,
    -25, -10,   0,  25,  25,   0, -10, -25,
    -50, -25, -10,   0,   0, -10, -25, -50,
    -50, -50, -25, -10, -10, -25, -50, -50 ],
  [  50, 150, -25,-125,-125, -25, 150,  50,
     50, 150, -25,-125,-125, -25, 150,  50,
     50, 150, -25,-125,-125, -25, 150,  50,
     50, 150, -25,-125,-125, -25, 150,  50,
     50, 150, -25,-125,-125, -25, 150,  50,
     50, 150, -25,-125,-125, -25, 150,  50,
     50, 150, -25,-125,-125, -25, 150,  50,
    150, 250,  75, -25, -25,  75, 250, 150 ]
];

Dagaz.AI.getPrice = function(design, piece, pos) {
  var r = design.price[piece.type];
  if ((pos >= 16) && (pos < 80) && (piece.type > 0)) {
      if (piece.player == 1) {
          r += penalty[+piece.type - 1][pos - 16];
      } else {
          r += penalty[+piece.type - 1][79 - pos];
      }
  }
  return r;
}

Dagaz.AI.isMajorPiece = function(type) {
  if (type < 3) return false;
  if (type > 6) return false;
  return true;
}

var checkStep = function(design, board, player, pos, dir, types) {
  var p = design.navigate(player, pos, dir);
  if  (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == player) return false;
  if (_.indexOf(types, +piece.type) < 0) return false;
  return true;
}

var checkSlide = function(design, board, player, pos, dir, types) {
  var p = design.navigate(player, pos, dir);
  if  (p === null) return false;
  var piece = board.getPiece(p);
  while (piece === null) {
      var q = design.navigate(player, p, 9);
      if (q === null) return false;
      if (board.getPiece(q) === null) return false;
      p = design.navigate(player, p, dir);
      if  (p === null) return false;
      piece = board.getPiece(p);
  }
  if (piece.player == player) return false;
  if (_.indexOf(types, +piece.type) < 0) return false;
  return true;
}

var checkJump = function(design, board, player, pos, d, o, type) {
  var p = design.navigate(player, pos, d);
  if  (p === null) return false;
  p = design.navigate(player, p, o);
  if  (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == player) return false;
  if (piece.type != type) return false;
  return true;
}

var isAttacked = function(design, board, player, pos) {
return checkStep(design, board, board.player, pos, 4, [1, 7])  ||
       checkStep(design, board, board.player, pos, 7, [1, 7])  ||
       checkStep(design, board, board.player, pos, 0, [7])     ||
       checkStep(design, board, board.player, pos, 1, [7])     ||
       checkStep(design, board, board.player, pos, 2, [7])     ||
       checkStep(design, board, board.player, pos, 3, [7])     ||
       checkStep(design, board, board.player, pos, 5, [7])     ||
       checkStep(design, board, board.player, pos, 6, [7])     ||
       checkSlide(design, board, board.player, pos, 0, [6, 3]) ||
       checkSlide(design, board, board.player, pos, 1, [6, 3]) ||
       checkSlide(design, board, board.player, pos, 2, [6, 3]) ||
       checkSlide(design, board, board.player, pos, 3, [6, 3]) ||
       checkSlide(design, board, board.player, pos, 4, [6, 5]) ||
       checkSlide(design, board, board.player, pos, 5, [6, 5]) ||
       checkSlide(design, board, board.player, pos, 6, [6, 5]) ||
       checkSlide(design, board, board.player, pos, 7, [6, 5]) ||
       checkJump(design, board, board.player, pos, 0, 6, 4)    ||
       checkJump(design, board, board.player, pos, 0, 7, 4)    ||
       checkJump(design, board, board.player, pos, 1, 4, 4)    ||
       checkJump(design, board, board.player, pos, 1, 5, 4)    ||
       checkJump(design, board, board.player, pos, 2, 5, 4)    ||
       checkJump(design, board, board.player, pos, 2, 6, 4)    ||
       checkJump(design, board, board.player, pos, 3, 4, 4)    ||
       checkJump(design, board, board.player, pos, 3, 7, 4);
}

Dagaz.AI.see = function(design, board, move) {
  if (!move.isSimpleMove()) return false;
  var pos = move.actions[0][0][0];
  var piece = board.getPiece(pos);
  if (piece === null) return false;
  if (piece.type == 0) return true;
  pos = move.actions[0][1][0];
  piece = board.getPiece(pos);
  if (piece === null) return false;
  if (isAttacked(design, board, piece.player, pos)) return false;
  return true;
}

Dagaz.AI.inCheck = function(design, board) {
  if (_.isUndefined(board.inCheck)) {
      board.inCheck = false;
      var king = null;
      for (var pos = 0; pos < design.positions.length; pos++) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player == board.player) && (piece.type == 7)) {
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
  if (move.isSimpleMove()) {
      var pos = move.actions[0][1][0];
      var piece = board.getPiece(pos);
      if (piece !== null) {
          r += Dagaz.AI.getPrice(design, piece, pos);
          piece = move.actions[0][2][0];
          r += (Dagaz.AI.getPrice(design, piece, pos) / 2) | 0;
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
