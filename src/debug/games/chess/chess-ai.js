(function() {

Dagaz.AI.AI_FRAME       = 1500;
Dagaz.AI.REP_DEEP       = 30;
Dagaz.AI.MAX_QS_LEVEL   = 3;
Dagaz.AI.MAX_AB_VARS    = 10;
Dagaz.AI.MAX_QS_VARS    = 2;
Dagaz.AI.STALEMATE      = 0;
Dagaz.AI.ENDGAME_PIECES = 3;

var penalty = [
  [  0,  0,  0,  0,  0,  0,  0,  0,   // Pawn
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
     5,  5, 10, 25, 25, 10,  5,  5,
     0,  0,  0, 20, 20,  0,  0,  0,
     5, -5,-10,  0,  0,-10, -5,  5,
     5, 10, 10,-20,-20, 10, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0 ],
  [  0,  0,  0,  0,  0,  0,  0,  0,   // Rook
     5, 10, 10, 10, 10, 10, 10,  5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
     0,  0,  0,  5,  5,  0,  0,  0 ],
  [-50,-40,-30,-30,-30,-30,-40,-50,   // Knight
   -40,-20,  0,  0,  0,  0,-20,-40,
   -30,  0, 10, 15, 15, 10,  0,-30,
   -30,  5, 15, 20, 20, 15,  5,-30,
   -30,  0, 15, 20, 20, 15,  0,-30,
   -30,  5, 10, 15, 15, 10,  5,-30,
   -40,-20,  0,  5,  5,  0,-20,-40,
   -50,-40,-30,-30,-30,-30,-40,-50 ],
 [ -20,-10,-10,-10,-10,-10,-10,-20,   // Bishop
   -10,  0,  0,  0,  0,  0,  0,-10,
   -10,  0,  5, 10, 10,  5,  0,-10,
   -10,  5,  5, 10, 10,  5,  5,-10,
   -10,  0, 10, 10, 10, 10,  0,-10,
   -10, 10, 10, 10, 10, 10, 10,-10,
   -10,  5,  0,  0,  0,  0,  5,-10,
   -20,-10,-10,-10,-10,-10,-10,-20 ],
 [ -20,-10,-10, -5, -5,-10,-10,-20,   // Queen
   -10,  0,  0,  0,  0,  0,  0,-10,
   -10,  0,  5,  5,  5,  5,  0,-10,
    -5,  0,  5,  5,  5,  5,  0, -5,
     0,  0,  5,  5,  5,  5,  0, -5,
   -10,  5,  5,  5,  5,  5,  0,-10,
   -10,  0,  5,  0,  0,  0,  0,-10,
   -20,-10,-10, -5, -5,-10,-10,-20 ],
 [ -30,-40,-40,-50,-50,-40,-40,-30,   // King (middle game)
   -30,-40,-40,-50,-50,-40,-40,-30,
   -30,-40,-40,-50,-50,-40,-40,-30,
   -30,-40,-40,-50,-50,-40,-40,-30,
   -20,-30,-30,-40,-40,-30,-30,-20,
   -10,-20,-20,-20,-20,-20,-20,-10,
    20, 20,  0,  0,  0,  0, 20, 20,
    20, 30, 10,  0,  0, 10, 30, 20 ],
 [ -50,-40,-30,-20,-20,-30,-40,-50,   // King (end game)
   -30,-20,-10,  0,  0,-10,-20,-30,
   -30,-10, 20, 30, 30, 20,-10,-30,
   -30,-10, 30, 40, 40, 30,-10,-30,
   -30,-10, 30, 40, 40, 30,-10,-30,
   -30,-10, 20, 30, 30, 20,-10,-30,
   -30,-30,  0,  0,  0,  0,-30,-30,
   -50,-30,-30,-30,-30,-30,-30,-50 ]
];

Dagaz.AI.getPrice = function(design, type, player, pos) {
  if (pos > 63) return 0;
  var r = design.price[type];
  if (player == 1) {
      r += penalty[type][pos];
  } else {
      r += penalty[type][63 - pos];
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
      if (Dagaz.AI.getPrice(design, piece.type, piece.player, p) > price) return false;
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
      if (Dagaz.AI.getPrice(design, piece.type, piece.player, p) > price) return false;
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
      if (Dagaz.AI.getPrice(design, piece.type, piece.player, p) > price) return false;
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
return checkStep(design, board, board.player, pos, price, 3, [0, 5], cover)  || // ne - Pawn, King
       checkStep(design, board, board.player, pos, price, 7, [0, 5], cover)  || // nw - Pawn, King
       checkStep(design, board, board.player, pos, price, 0, [5], cover)     || // w - King
       checkStep(design, board, board.player, pos, price, 1, [5], cover)     || // e - King
       checkStep(design, board, board.player, pos, price, 2, [5], cover)     || // s - King
       checkStep(design, board, board.player, pos, price, 4, [5], cover)     || // n - King
       checkStep(design, board, board.player, pos, price, 5, [5], cover)     || // se - King
       checkStep(design, board, board.player, pos, price, 6, [5], cover)     || // sw - King
       checkSlide(design, board, board.player, pos, price, 0, [4, 1], cover) || // w - Queen, Rook
       checkSlide(design, board, board.player, pos, price, 1, [4, 1], cover) || // e - Queen, Rook
       checkSlide(design, board, board.player, pos, price, 2, [4, 1], cover) || // s - Queen, Rook
       checkSlide(design, board, board.player, pos, price, 3, [4, 3], cover) || // ne - Queen, Bishop
       checkSlide(design, board, board.player, pos, price, 4, [4, 1], cover) || // n - Queen, Rook
       checkSlide(design, board, board.player, pos, price, 5, [4, 3], cover) || // se - Queen, Bishop
       checkSlide(design, board, board.player, pos, price, 6, [4, 3], cover) || // sw - Queen, Bishop
       checkSlide(design, board, board.player, pos, price, 7, [4, 3], cover) || // nw - Queen, Bishop
       checkJump(design, board, board.player, pos, price, 0, 6, 2, cover)    || // w sw - Knight
       checkJump(design, board, board.player, pos, price, 0, 7, 2, cover)    || // w nw - Knight
       checkJump(design, board, board.player, pos, price, 1, 3, 2, cover)    || // e ne - Knight
       checkJump(design, board, board.player, pos, price, 1, 5, 2, cover)    || // e se - Knight
       checkJump(design, board, board.player, pos, price, 2, 5, 2, cover)    || // s se - Knight
       checkJump(design, board, board.player, pos, price, 2, 6, 2, cover)    || // s sw - Knight
       checkJump(design, board, board.player, pos, price, 4, 3, 2, cover)    || // n ne - Knight
       checkJump(design, board, board.player, pos, price, 4, 7, 2, cover);      // n nw - Knight
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

// TODO: cover
// TODO: X-Ray атаки
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
          r += Dagaz.AI.getPrice(design, piece.type, piece.player, pos);
      }
  }
  return r;
}

// TODO: Mobility
Dagaz.AI.eval = function(design, params, board, player) {
  if (_.isUndefined(board.completeEval)) {
      board.completeEval = 0;
      var cover = [];
      var cnt = [0, 0];
      _.each(design.allPositions(), function(pos) {
           var piece = board.getPiece(pos);
           if (piece === null) return;
           cnt[+piece.player]++;
      });
      _.each(design.allPositions(), function(pos) {
           var piece = board.getPiece(pos);
           if (piece === null) return;
           if (piece.type == 0) return;
           var t = piece.type;
           if ((t == 5) && (cnt[+piece.player] <= Dagaz.AI.ENDGAME_PIECES)) t++;
           var v = Dagaz.AI.getPrice(design, t, piece.player, pos);
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
               var t = target.type;
               if ((t == 5) && (cnt[+target.player] <= Dagaz.AI.ENDGAME_PIECES)) t++;
               var x = Dagaz.AI.getPrice(design, t, target.player, p) * 2;
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
