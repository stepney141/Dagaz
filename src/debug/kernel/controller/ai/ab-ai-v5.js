(function() {

Dagaz.AI.inProgress = false;
Dagaz.AI.AI_FRAME   = 5000;
Dagaz.AI.IDLE_FRAME = 1000;

var MAX_VALUE = 2000000;
var HASH_MASK = (1 << 22) - 1;

var ALPHA_FLAG = 1;
var BETA_FLAG  = 2;
var EXACT_FLAG = 3;

function Ai(parent) {
  this.parent = parent;
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "ab") || (type == "common") || (type == "1") || (type == "2")) {
      return new Ai(parent);
  } else {
      return findBot(type, params, parent);
  }
}

Dagaz.AI.getPrice = function(design, piece, pos) {
  return design.price[piece.type];
}

Dagaz.AI.isMajorPiece = function(type) {
  return type > 0;
}

Ai.prototype.getBaseEval = function(ctx, board) {
  if (!_.isUndefined(board.baseEval)) {
      board.baseEval = 0;
      board.isZugzwang = true;
      _.each(ctx.design.allPositions(), function(pos) {
           var piece = board.getPiece(pos);
           if (piece === null) return;
           var v = Dagaz.AI.getPrice(ctx.design, piece, pos);
           if (Dagaz.AI.isMajorPiece(piece.type)) {
               board.isZugzwang = false;
           }
           if (piece.player == ctx.player) {
               board.baseEval += v;
           } else {
               board.baseEval -= v;
           }
      });
  }
  return board.baseEval;
}

Ai.prototype.getCompleteEval = function(ctx, board) {
  return Dagaz.AI.eval(ctx.design, [], board, ctx.board.player);
}

Ai.prototype.noZugzwang = function(ctx, board) {
  this.getBaseEval(ctx, board);
  return !board.isZugzwang;
}

Ai.prototype.getMoveScore = function(ctx, board, move) {
  return Dagaz.AI.heuristic(this, ctx.design, board, move);
}

Dagaz.AI.isRepDraw = function(board) {
  return false;
}

Dagaz.AI.inCheck = function(design, board) {
  return false;
}

Dagaz.AI.isCapture = function(board, move) {
  for (var i = 0; i < move.actions.length; i++) {
       var a = move.actions[i];
       if (a[0] !== null) {
           if (a[1] === null) return true;
           if (board.getPiece(a[1][0]) !== null) return true;
       }
  }
  return false;
}

// TODO: ¬ cache сохран€етс€ только доска, а не все пол€ как в ab
Ai.prototype.applyMove = function(ctx, board, move) {
  var b = board.apply(move);
  var node = ctx.cache[b.zSign & HASH_MASK];
  if (!_.isUndefined(node)) {
      return node.board;
  }
  ctx.cache[b.zSign & HASH_MASK] = {
      board: b,
      lock:  b.zSign
  };
  return b;
}

// TODO: ¬озвращает список порождЄнных позиций, св€занных по next
Ai.prototype.getSortedMoves = function(ctx, board, best, level) {
  // TODO:

}

// TODO: —охран€етс€ доска, а не ход (ход доступен в board.move)
Ai.prototype.store = function(ctx, value, flag, maxLevel, board, level) {
  // TODO:

}

Ai.prototype.see = function(ctx, board, move) {
  // TODO:

}

Ai.prototype.acn = function(ctx, board, maxLevel, level, beta, allowNull) {
  if (maxLevel <= 0) return this.qs(ctx, board, beta - 1, beta, 0);
  if ((ctx.nodeCount & 127) == 127) {
      if (Date.now() - ctx.timestamp > Dagaz.AI.AI_FRAME) {
          Dagaz.AI.inProgress = false;
          return beta - 1;
      }
  }
  ctx.nodeCount++;
  if (Dagaz.AI.isRepDraw(board)) return 0;
  if (-MAX_VALUE + level >= beta) return beta;
  if (MAX_VALUE - (level + 1) < beta) return beta - 1;
  var best = null;
  var node = ctx.cache[board.zSign & HASH_MASK];
  if (!_.isUndefined(node) && (node.lock == board.zSign)) {
      best = node.best;
      if (node.level >= maxLevel) {
          var value = node.value;
          if (value >= MAX_VALUE - 2000) value -= level;
              else if (value <= -MAX_VALUE + 2000) value += level;
          if (node.flag == EXACT_FLAG) return value;
          if ((node.flag == ALPHA_FLAG) && (value < beta)) return value;
          if ((node.flag == BETA_FLAG) && (value >= beta)) return value;
      }
  }
  if (!Dagaz.AI.inCheck(ctx.design, board) && allowNull && (beta > -MAX_VALUE + 2000) && (beta < MAX_VALUE - 2000)) {
      // Razoring: https://www.chessprogramming.org/Razoring
      if ((best === null) && (maxLevel < 4)) {
          var razorMargin = 2500 + 200 * maxLevel;
          if (this.getBaseEval(ctx, board) < beta - razorMargin) {
              var razorBeta = beta - razorMargin;
              var v = this.qs(ctx, board, razorBeta - 1, razorBeta, 0);
              if (v < razorBeta) return v;
          }
      }
      // Null move: https://www.chessprogramming.org/Null_Move_Pruning
      var baseEval = this.getBaseEval(ctx, board);
      if ((maxLevel > 1) && (baseEval >= beta - (maxLevel >= 4 ? 2500 : 0)) && this.noZugzwang(ctx, board)) {
          var r = 3 + (maxLevel >= 5 ? 1 : maxLevel / 4);
          if (baseEval - beta > 1500) r++;
          var b = board.apply(Dagaz.Model.createMove(0));
          b.baseEval = -baseEval;
          var value = -this.acn(ctx, b, maxLevel - r, level + 1, -(beta - 1), false);
          if (value >= beta) return beta;
      }
  }
  var f = false;
  var e = -MAX_VALUE - 1;
  var inCheck = Dagaz.AI.inCheck(ctx.design, board);
  for (var b = this.getSortedMoves(ctx, board, best, level); !_.isUndefined(b); b = b.next) {
       var ltos = maxLevel - 1;
       var v = null;
       var isFs = true;
       if (inCheck) {
           ltos++;
       } /* TODO: else {
           var r = ltos - (movePicker.atMove > 14 ? 2 : 1);
           // Late move reductions
           if (movePicker.stage == 5 && movePicker.atMove > 5 && ply >= 3) {
               v = -this.acn(ctx, b, r, level + 1, -(beta - 1), true);
               isFs = (v >= beta);
           }
       }*/
       if (isFs) {
           v = -this.acn(ctx, b, maxLevel, level + 1, -(beta  - 1), true);
       }
       f = true;
       if (!Dagaz.AI.inProgress) return beta - 1;
       if (v > e) {
           if (v >= beta) {
               this.store(ctx, v, BETA_FLAG, maxLevel, b, level);
               return v;
           }
           e = v;
           best = b;
       }
  }
  if (!f) {
      if (inCheck) 
          // Checkmate
          return -MAX_VALUE + level;
      else
          // Stalemate
          return 0;
  }
  this.store(ctx, e, ALPHA_FLAG, maxLevel, best, level);
  return e;
}

// TODO: ƒл€ inCheck генерировать все ходы (на уровне режимов), иначе только вз€ти€ !!!
Ai.prototype.qs = function(ctx, board, alpha, beta, maxLevel) {
  ctx.qNodeCount++;
  var inCheck = Dagaz.AI.inCheck(ctx.design, board);
  var e = inCheck ? (-MAX_VALUE + 1) : this.getCompleteEval(ctx, board);
  if (e >= beta) return e;
  if (e > alpha) alpha = e;
  board.moves = Dagaz.AI.generate(ctx, board);
  var moves = [];
  _.each(board.moves, function(move) {
      if (inCheck || Dagaz.AI.isCapture(board, move)) moves.push(move);
  });
  _.each(moves, function(move) {
     if (!_.isUndefined(move.score)) return;
     move.score = this.getMoveScore(ctx, board, move);
  }, this);
  moves = _.sortBy(moves, function(move) {
     return -move.score;
  });
  for (var i = 0; i < moves.length; i++) {
     if (!inCheck && !this.see(ctx, board, moves[i])) continue;
     var b = this.applyMove(ctx, board, moves[i]);
     var v = -this.qs(ctx, b, -beta, -alpha, maxLevel - 1);
     if (v > e) {
         if (v >= beta) return v;
         if (v > alpha) alpha = v;
         e = v;
     }
  }
  return e;
}

Ai.prototype.ab = function(ctx, board, maxLevel, level, alpha, beta) {
  if (maxLevel <= 0) return this.qs(ctx, board, alpha, beta, 0);
  ctx.nodeCount++;
  if ((level > 0) && Dagaz.AI.isRepDraw(board)) return 0;
  var oa = alpha;
  if (alpha > -MAX_VALUE + level) alpha = -MAX_VALUE + level;
  if (beta < MAX_VALUE - (level + 1)) beta = MAX_VALUE - (level + 1);
  if (alpha >= b) return alpha;
  var best = null;
  var flag = ALPHA_FLAG;
  var node = ctx.cache[board.zSign & HASH_MASK];
  if (!_.isUndefined(node) && (node.lock == board.zSign)) {
      best = node.best;
  }
  var inCheck = Dagaz.AI.inCheck(ctx.design, board);
  var f = false;
  var e = -MAX_VALUE;
  for (var b = this.getSortedMoves(ctx, board, best, level); !_.isUndefined(b); b = b.next) {
       var ltos = maxLevel - 1;
       if (Dagaz.AI.inCheck(ctx.design, b)) ltos++;
       var v = null;
       if (f) {
           v = -this.acn(ctx, b, ltos, level + 1, -alpha, true);
           if (v > alpha) {
               v = -this.ab(ctx, b, ltos, level + 1, -beta, -alpha);
           }
       } else {
           v = -this.ab(ctx, b, ltos, level + 1, -beta, -alpha);
       }
       f = true;
       if (!Dagaz.AI.inProgress) return alpha;
       if (v > e) {
           if (v >= beta) {
               this.store(ctx, v, BETA_FLAG, maxLevel, b, level);
               return v;
           }
           if (v > oa) {
               flag = EXACT_FLAG;
               alpha = v;
           }
           e = v;
           best = b;
       }
  }
  if (!f) {
       if (inCheck) 
           // Checkmate
           return -MAX_VALUE + level;
       else 
           // Stalemate
           return 0;
  }
  this.store(ctx, e, flag, maxLevel, best, level);
  return e;
}

Ai.prototype.setContext = function(ctx, board) {
  ctx.board = board;
  ctx.timestamp  = Date.now();
  ctx.nodeCount  = 0;
  ctx.qNodeCount = 0;
  if (_.isUndefined(ctx.cache)) {
      ctx.cache = [];
  }
}

Ai.prototype.getMove = function(ctx) {
  ctx.board.moves = Dagaz.AI.generate(ctx, ctx.board);
  if (ctx.board.moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  if (ctx.board.moves.length == 1) {
      return {
           done: true,
           move: ctx.board.moves[0],
           time: Date.now() - ctx.timestamp,
           ai:  "once"
      };
  }
  ctx.timestamp = Date.now();
  ctx.best = null;
  Dagaz.AI.inProgress = true;
  var alpha = -MAX_VALUE;
  var beta = MAX_VALUE;
  for (var i = 1; (i < 100) && Dagaz.AI.inProgress; i++) {
       var v = this.ab(ctx, ctx.board, i, 0, alpha, beta);
       if (!Dagaz.AI.inProgress) break;
       if ((v > alpha) && (v < beta)) {
           alpha = v - 500;
           beta = v + 500;
           if (alpha < -MAX_VALUE) alpha = -MAX_VALUE;
           if (beta > MAX_VALUE) beta = MAX_VALUE;
       } else if (alpha != -MAX_VALUE) {
           alpha = -MAX_VALUE;
           beta = MAX_VALUE;
           i--;
       }
       var node = ctx.cache[board.zSign & HASH_MASK];
       if (!_.isUndefined(node) && (node.lock == board.zSign)) {
           ctx.best = node.best.move;
       }
  }
  Dagaz.AI.inProgress = false;
  if (ctx.best !== null) {
      return {
           done: true,
           move: ctx.best,
           time: Date.now() - ctx.timestamp,
           ai:  "ab"
      };
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

})();
