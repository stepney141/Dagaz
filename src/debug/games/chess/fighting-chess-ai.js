(function() {

Dagaz.AI.AI_FRAME     = 1500;
Dagaz.AI.REP_DEEP     = 30;
Dagaz.AI.MAX_QS_LEVEL = 3;
Dagaz.AI.MAX_AB_VARS  = 10;
Dagaz.AI.MAX_QS_VARS  = 2;
Dagaz.AI.STALEMATE    = 0;

var penalty = [
  [   0,   0,   0,   0,   0,   0,   0,   0,   // Pawn
    -25, 105, 135, 270, 270, 135, 105, -25,
    -80,   0,  30, 176, 176,  30,   0, -80,
    -85,  -5,  25, 175, 175,  25,  -5, -85,
    -90, -10,  20, 125, 125,  20, -10, -90,
    -95, -15,  15,  75,  75,  15, -15, -95, 
   -100, -20,  10,  70,  70,  10, -20,-100, 
      0,   0,   0,   0,   0,   0,   0,   0 ],
  [ -60, -30, -10,  20,  20, -10, -30, -60,   // Rook
     40,  70,  90, 120, 120,  90,  70,  40,
    -60, -30, -10,  20,  20, -10, -30, -60,
    -60, -30, -10,  20,  20, -10, -30, -60,
    -60, -30, -10,  20,  20, -10, -30, -60,
    -60, -30, -10,  20,  20, -10, -30, -60,
    -60, -30, -10,  20,  20, -10, -30, -60,
    -60, -30, -10,  20,  20, -10, -30, -60 ],
  [-200,-100, -50, -50, -50, -50,-100,-200,   // Knight
   -100,   0,   0,   0,   0,   0,   0,-100,
    -50,   0,  60,  60,  60,  60,   0, -50,
    -50,   0,  30,  60,  60,  30,   0, -50,
    -50,   0,  30,  60,  60,  30,   0, -50,
    -50,   0,  30,  30,  30,  30,   0, -50,
   -100,   0,   0,   0,   0,   0,   0,-100,
   -200, -50, -25, -25, -25, -25, -50,-200 ],
  [ -50, -50, -25, -10, -10, -25, -50, -50,   // Bishop
    -50, -25, -10,   0,   0, -10, -25, -50,
    -25, -10,   0,  25,  25,   0, -10, -25,
    -10,   0,  25,  40,  40,  25,   0, -10,
    -10,   0,  25,  40,  40,  25,   0, -10,
    -25, -10,   0,  25,  25,   0, -10, -25,
    -50, -25, -10,   0,   0, -10, -25, -50,
    -50, -50, -25, -10, -10, -25, -50, -50 ],
  [ -50, -50, -25, -10, -10, -25, -50, -50,   // Queen
    -50, -25, -10,   0,   0, -10, -25, -50,
    -25, -10,   0,  25,  25,   0, -10, -25,
    -10,   0,  25,  40,  40,  25,   0, -10,
    -10,   0,  25,  40,  40,  25,   0, -10,
    -25, -10,   0,  25,  25,   0, -10, -25,
    -50, -25, -10,   0,   0, -10, -25, -50,
    -50, -50, -25, -10, -10, -25, -50, -50 ],
  [  50, 150, -25,-125,-125, -25, 150,  50,   // King
     50, 150, -25,-125,-125, -25, 150,  50,
     50, 150, -25,-125,-125, -25, 150,  50,
     50, 150, -25,-125,-125, -25, 150,  50,
     50, 150, -25,-125,-125, -25, 150,  50,
     50, 150, -25,-125,-125, -25, 150,  50,
     50, 150, -25,-125,-125, -25, 150,  50,
    150, 250,  75, -25, -25,  75, 250, 150 ]
];

Dagaz.AI.getPrice = function(design, piece, pos) {
  if (pos > 63) return 0;
  var r = design.price[piece.type];
  if (piece.player == 1) {
      r += penalty[piece.type][pos];
  } else {
      r += penalty[piece.type][63 - pos];
  }
  return r;
}

Dagaz.AI.isMajorPiece = function(type) {
  if (type == 0) return false; // Pawn
  if (type == 5) return false; // King
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

var checkStep = function(design, board, player, pos, price, dir, types, cover) {
  var p = design.navigate(player, pos, dir);
  if  (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == player) return false;
  if (_.indexOf(types, +piece.type) < 0) return false;
  if (!_.isUndefined(price)) {
      if (isAttacked(design, board, piece.player, p)) return false;
      if (Dagaz.AI.getPrice(design, piece, p) > price) return false;
  }
  if (!_.isUndefined(cover)) {
      if (_.isUndefined(cover[p])) {
          cover[p] = [pos];
      } else {
          cover[p].push(pos);
      }
  }
  return true;
}

var checkSlide = function(design, board, player, pos, price, dir, types, cover) {
  var p = design.navigate(player, pos, dir);
  if  (p === null) return false;
  var piece = board.getPiece(p);
  while (piece === null) {
      p = design.navigate(player, p, dir);
      if  (p === null) return false;
      piece = board.getPiece(p);
  }
  if (piece.player == player) return false;
  if (_.indexOf(types, +piece.type) < 0) return false;
  if (!_.isUndefined(price)) {
      if (isAttacked(design, board, piece.player, p)) return false;
      if (Dagaz.AI.getPrice(design, piece, p) > price) return false;
  }
  if (!_.isUndefined(cover)) {
      if (_.isUndefined(cover[p])) {
          cover[p] = [pos];
      } else {
          cover[p].push(pos);
      }
  }
  return true;
}

var checkJump = function(design, board, player, pos, price, d, o, type, cover) {
  var p = design.navigate(player, pos, d);
  if  (p === null) return false;
  p = design.navigate(player, p, o);
  if  (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == player) return false;
  if (piece.type != type) return false;
  if (!_.isUndefined(price)) {
      if (isAttacked(design, board, piece.player, p)) return false;
      if (Dagaz.AI.getPrice(design, piece, p) > price) return false;
  }
  if (!_.isUndefined(cover)) {
      if (_.isUndefined(cover[p])) {
          cover[p] = [pos];
      } else {
          cover[p].push(pos);
      }
  }
  return true;
}

var isAttacked = function(design, board, player, pos, price, cover) {
return checkStep(design, board, board.player, pos, price, 5, [0, 5], cover)  || // ne - Pawn, King
       checkStep(design, board, board.player, pos, price, 6, [0, 5], cover)  || // nw - Pawn, King
       checkStep(design, board, board.player, pos, price, 4, [5], cover)     || // w - King
       checkStep(design, board, board.player, pos, price, 3, [5], cover)     || // e - King
       checkStep(design, board, board.player, pos, price, 1, [5], cover)     || // s - King
       checkStep(design, board, board.player, pos, price, 7, [5], cover)     || // n - King
       checkStep(design, board, board.player, pos, price, 0, [5], cover)     || // se - King
       checkStep(design, board, board.player, pos, price, 2, [5], cover)     || // sw - King
       checkSlide(design, board, board.player, pos, price, 4, [4, 1], cover) || // w - Queen, Rook
       checkSlide(design, board, board.player, pos, price, 3, [4, 1], cover) || // e - Queen, Rook
       checkSlide(design, board, board.player, pos, price, 1, [4, 1], cover) || // s - Queen, Rook
       checkSlide(design, board, board.player, pos, price, 5, [4, 3], cover) || // ne - Queen, Bishop
       checkSlide(design, board, board.player, pos, price, 7, [4, 1], cover) || // n - Queen, Rook
       checkSlide(design, board, board.player, pos, price, 0, [4, 3], cover) || // se - Queen, Bishop
       checkSlide(design, board, board.player, pos, price, 2, [4, 3], cover) || // sw - Queen, Bishop
       checkSlide(design, board, board.player, pos, price, 6, [4, 3], cover) || // nw - Queen, Bishop
       checkJump(design, board, board.player, pos, price, 4, 2, 2, cover)    || // w sw - Knight
       checkJump(design, board, board.player, pos, price, 4, 6, 2, cover)    || // w nw - Knight
       checkJump(design, board, board.player, pos, price, 3, 5, 2, cover)    || // e ne - Knight
       checkJump(design, board, board.player, pos, price, 3, 0, 2, cover)    || // e se - Knight
       checkJump(design, board, board.player, pos, price, 1, 0, 2, cover)    || // s se - Knight
       checkJump(design, board, board.player, pos, price, 1, 2, 2, cover)    || // s sw - Knight
       checkJump(design, board, board.player, pos, price, 7, 5, 2, cover)    || // n ne - Knight
       checkJump(design, board, board.player, pos, price, 7, 6, 2, cover);      // n nw - Knight
}

Dagaz.AI.see = function(design, board, move) {
  if (!move.isSimpleMove()) return false;
  var pos = move.actions[0][0][0];
  var piece = board.getPiece(pos);
  if (piece === null) return false;
  if (piece.type == 0) return true; // Pawn
  pos = move.actions[0][1][0];
  piece = board.getPiece(pos);
  if (piece === null) return false;
  return true;
}

Dagaz.AI.inCheck = function(design, board) {
  if (_.isUndefined(board.inCheck)) {
      board.inCheck = false;
      var king = null;
      for (var pos = 0; pos < design.positions.length; pos++) {
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player == board.player) && (piece.type == 5)) { // King
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
      }
  }
  return r;
}

Dagaz.AI.eval = function(design, params, board, player) {
  if (_.isUndefined(board.completeEval)) {
      board.completeEval = 0;
      var cover = [];
      _.each(design.allPositions(), function(pos) {
           var piece = board.getPiece(pos);
           if (piece === null) return;
           var v = Dagaz.AI.getPrice(design, piece, pos);
           // Check Attacking
           if (isAttacked(design, board, piece.player, pos, Math.abs(v), cover)) {
               v = (v / 4) | 0;
           }
           if (piece.player == board.player) {
               board.completeEval += v;
           } else {
               board.completeEval -= v;
           }
      });
      // Check Forks
      _.each(_.keys(cover), function(pos) {
           if (cover[pos].length == 0) return;
           var piece = board.getPiece(pos);
           if (piece === null) return;
           if (isAttacked(design, board, piece.player, pos)) return;
           var v = null;
           _.each(cover[pos], function(p) {
               var target = board.getPiece(p);
               if (target === null) return;
               if (target.player == piece.player) return;
               var x = Dagaz.AI.getPrice(design, target, p) * 2;
               if ((v === null) || (v > x)) v = x;
           });
           if (v === null) return;
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
