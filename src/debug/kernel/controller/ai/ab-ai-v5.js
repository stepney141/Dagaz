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

Dagaz.AI.isRepDraw = function(board) {
  return false;
}

Dagaz.AI.inCheck = function(board) {
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

// TODO: В cache сохраняется только доска, а не все поля как в ab
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

// TODO: Возвращает список порождённых позиций, связанных по next
Ai.prototype.getSortedMoves = function(ctx, board, best, level) {
  // TODO:

}

// TODO: Сохраняется доска, а не ход (ход доступен в board.move)
Ai.prototype.store = function(ctx, board, value, flag, maxLevel, best, level) {
  // TODO:

}

Ai.prototype.see = function(ctx, board, move) {
  // TODO:

}

Ai.prototype.acn = function(ctx, board, maxLevel, level, beta, allowNull) {
  // TODO:

}

// TODO: От какого player вычислять eval?
// TODO: Для inCheck генерировать все ходы (на уровне режимов), иначе только взятия !!!
Ai.prototype.qs = function(ctx, board, alpha, beta, maxLevel) {
  ctx.qNodeCount++;
  var inCheck = Dagaz.AI.inCheck(board);
  var e = inCheck ? (-MAX_VALUE + 1) : Dagaz.AI.eval(ctx.design, [], board, ctx.board.player);
  if (e >= beta) return e;
  if (e > alpha) alpha = e;
  board.moves = Dagaz.AI.generate(ctx, board);
  var moves = [];
  _.each(board.moves, function(move) {
      if (inCheck || Dagaz.AI.isCapture(board, move)) moves.push(move);
  });
  _.each(moves, function(move) {
     if (!_.isUndefined(move.score)) return;
     move.score = Dagaz.AI.heuristic(this, ctx.design, board, move);
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
  var inCheck = Dagaz.AI.inCheck(board);
  var f = false;
  var e = -MAX_VALUE;
  for (var b = this.getSortedMoves(ctx, board, best, level); !_.isUndefined(b); b = b.next) {
       var ltos = maxLevel - 1;
       if (Dagaz.AI.inCheck(b)) ltos++;
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
               this.store(ctx, board, v, BETA_FLAG, maxLevel, b, level);
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
       if (inCheck) return -MAX_VALUE + level;
           else return 0;
  }
  this.store(ctx, board, e, flag, maxLevel, best, level);
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
       if (!_.isUndefined(node)) {
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
