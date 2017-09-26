(function() {

var MAXVALUE          = 1000000;

Dagaz.AI.MAX_DEEP     = 5;
Dagaz.AI.NOISE_FACTOR = 5;
Dagaz.AI.AI_FRAME     = 3000;

function MaxMinAi(params, parent) {
  this.params = params;
  this.parent = parent;
  if (_.isUndefined(this.params.NOISE_FACTOR)) {
      this.params.NOISE_FACTOR = Dagaz.AI.NOISE_FACTOR;
  }
  if (_.isUndefined(this.params.AI_FRAME)) {
      this.params.AI_FRAME = Dagaz.AI.AI_FRAME;
  }
  if (_.isUndefined(this.params.MAX_DEEP)) {
      this.params.MAX_DEEP = Dagaz.AI.MAX_DEEP;
  }
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "maxmin") || (type == "common")) {
      return new MaxMinAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = design.price[piece.type];
          if (piece.player != player) {
              v = -v;
          }
          r += v;
      }
  });
  return r;
}

MaxMinAi.prototype.eval = function(ctx, board, player) {
  return Dagaz.AI.eval(ctx.design, this.params, board, player);
}

MaxMinAi.prototype.simulate = function(ctx, board, player) {
  // TODO: Continue forced moves
  // TODO: Use LastTo position (for Chess)
  return this.eval(ctx, board, player);
}

MaxMinAi.prototype.expandMoves = function(ctx, board, player, cache, noEval) {
  var result = null;
  if (board.moves.length == 0) {
      board.moves = Dagaz.AI.generate(ctx, board);
  }
  if (board.moves.length == 0) {
      if (board.player == player) {
          return -MAXVALUE;
      } else {
          return MAXVALUE;
      }
  }
  if (!_.isUndefined(Dagaz.AI.heuristic)) {
      board.moves = _.chain(board.moves)
       .map(function(move) {
            return {
               move: move,
               eval: Dagaz.AI.heuristic(ctx.design, this.params, board, move)
            };
        }, this)
       .filter(function(node) {
           return node.eval >= 0;
        })
       .sortBy(function(node) {
           return -node.eval;
        })
       .map(function(node) {
           return node.move;
        }).value();
  }
  _.each(board.moves, function(move) {
      var e = 0;
      var b = board.apply(move);
      var g = Dagaz.Model.checkGoals(ctx.design, b, player);
      if (g != 0) {
          e = MAXVALUE * g;
      } else {
          if (!noEval) {
              e = this.simulate(ctx, b, player);
          }
      }
      if ((result === null) ||
         ((board.player == player) && (e > result)) ||
         ((board.player != player) && (e < result))) {
          result = e;
      }
      cache.push({
          board: b,
          move:  move,
          eval:  e
      });
  });
  return result;
}

MaxMinAi.prototype.changeCache = function(ctx, board) {
  ctx.board = board;
  if (!_.isUndefined(ctx.cache) && (board.zSign != 0)) {
      for (var i = 0; i < ctx.cache.length; i++) {
           if (ctx.cache[i].board.zSign == board.zSign) {
               if (!_.isUndefined(board.move)) {
                   if (board.move.toString() != ctx.cache[i].move.toString()) continue;
               }
               if (!_.isUndefined(ctx.cache[i].cache)) {
                   ctx.cache = ctx.cache[i].cache;
                   return;
               }
           }
      }
  }
  ctx.cache = [];
  this.expandMoves(ctx, board, board.player, ctx.cache, true);
}

MaxMinAi.prototype.setCache = function(ctx, n) {
  ctx.board = ctx.cache[n].board;
  ctx.cache = ctx.cache[n].cache;
}

MaxMinAi.prototype.setContext = function(ctx, board) {
  if (this.parent) {
      this.parent.setContext(ctx, board);
  }
  ctx.timestamp = Date.now();
  this.changeCache(ctx, board);
}

MaxMinAi.prototype.shedule = function(ctx, cache) {
  if (cache.length == 0) return null;
  return _.random(0, cache.length - 1);
}

MaxMinAi.prototype.proceed = function(ctx, cache, n, deep) {
  var node = ctx.cache[n];
  if (!deep) {
      deep = 1;
  }
  if (deep < this.params.MAX_DEEP) {
      if (_.isUndefined(node.cache)) {
          node.cache = [];
          node.eval  = this.expandMoves(ctx, node.board, ctx.board.player, node.cache);
      } else {
          var ix     = this.shedule(ctx, node.cache);
          var old    = node.cache[ix].eval;
          var eval   = this.proceed(ctx, node.cache, ix);
          if (node.eval == old) {
              if (ctx.board.player == node.board.player) {
                  node.eval = _.max(node.cache, function(n) {
                      return n.eval;
                  });
              } else {
                  node.eval = _.min(node.cache, function(n) {
                      return n.eval;
                  });
              }
          } else {
              if (ctx.board.player == node.board.player) {
                  if (eval > node.eval) {
                      node.eval = eval;
                  }
              } else {
                  if (eval < node.eval) {
                      node.eval = eval;
                  }
              }
          }
      }
  }
  return node.eval;
}

MaxMinAi.prototype.getMove = function(ctx) {
  var result = null;
  for (var ix = 0; ix < ctx.cache.length; ix++) {
       var node = ctx.cache[ix];
       if (_.isUndefined(node.cache)) {
           node.cache = [];
           node.eval = this.expandMoves(ctx, ctx.board, ctx.board.player, node.cache);
       }
       if (node.eval == MAXVALUE) {
           result = ix;
       }
  }
  if (result === null) {
      while ((result === null) && (Date.now() - ctx.timestamp < this.params.AI_FRAME)) {
          var ix = this.shedule(ctx, ctx.cache);
          if (ix === null) break;
          var eval = this.proceed(ctx, ctx.cache, ix);
          if (eval == MAXVALUE) {
              result = ix;
          }
      }
  }
  var eval = 0;
  if (result === null) {
      for (var ix = 0; ix < ctx.cache.length; ix++) {
           var node = ctx.cache[ix];
           if ((move === null) || (node.eval > eval)) {
                result = ix;
                eval = node.eval;
           } else {
                if ((node.eval == eval) && (_.random(0, 10) > this.params.NOISE_FACTOR)) {
                    result = ix;
                }
           }
      }
  }
  if (result !== null) {
      this.setCache(ctx, result);
      return {
           done: true,
           move: ctx.cache[result].move,
           time: Date.now() - ctx.timestamp,
           ai:  "maxmin"
      };
  } else {
      ctx.cache = [];
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

)();
