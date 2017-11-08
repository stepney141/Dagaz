(function() {

var MAXVALUE          = 1000000;

Dagaz.AI.AI_FRAME     = 3000;
Dagaz.AI.NOISE_FACTOR = 5;
Dagaz.AI.NO_MOVE_GOAL = 1;
Dagaz.AI.MIN_DEEP     = 3;
Dagaz.AI.MAX_DEEP     = 7;

function MaxMinAi(params, parent) {
  this.params = params;
  this.parent = parent;
  if (_.isUndefined(this.params.AI_FRAME)) {
      this.params.AI_FRAME = Dagaz.AI.AI_FRAME;
  }
  if (_.isUndefined(this.params.NOISE_FACTOR)) {
      this.params.NOISE_FACTOR = Dagaz.AI.NOISE_FACTOR;
  }
  if (_.isUndefined(this.params.MIN_DEEP)) {
      this.params.MIN_DEEP = Dagaz.AI.MIN_DEEP;
  }
  if (_.isUndefined(this.params.MAX_DEEP)) {
      this.params.MAX_DEEP = Dagaz.AI.MAX_DEEP;
  }
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "maxmin") || (type == "common") || (type == "1") || (type == "2")) {
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

var price = function(design, piece, player) {
  if (piece === null) return 0;
  if (piece.player == player) {
      return -design.price[piece.type];
  } else {
      return design.price[piece.type];
  }
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 0;
  _.each(move.actions, function(a) {
      if (a[0] !== null) {
          var pos = a[0][0];
          if (a[1] === null) {
              var piece = board.getPiece(pos);
              r += price(design, piece, board.player);
          } else {
              var target = a[1][0];
              var piece = board.getPiece(target);
              r += price(design, piece, board.player);
          }
      }
  });
  return r;
}

Dagaz.AI.isChessForced = function(design, board, move) {
  if (_.isUndefined(board.lastc)) return false;
  for (var i = 0; i < move.actions.length; i++) {
       var a = move.actions[i];
       if ((a[0] !== null) && (a[1] !== null) && (a[1][0] == board.lastc)) {
           return true;
       }
  }
  return false;
}

Dagaz.AI.isCheckersForced = function(design, board, move) {
  return move.actions.length > 1;
}

MaxMinAi.prototype.expand = function(ctx, node) {
  var result = null;
  if (_.isUndefined(node.cache)) {
      node.board.moves = Dagaz.AI.generate(ctx, node.board);
      node.cache = _.chain(node.board.moves)
       .map(function(m) {
           return {
               move:  m,
               board: node.board.apply(m),
               h:     Dagaz.AI.heuristic(this, ctx.design, node.board, m)
           };
        }, this)
       .filter(function(n) {
           return n.h >= 0;
        })
       .sortBy(function(n) {
           return -n.h;
        }).value();
      node.hwm = 0;
      for (var ix = 0; ix < node.cache.length; ix++) {
           n = node.cache[ix];
           var goal = n.board.checkGoals(ctx.design, node.board.player);
           if (goal !== null) {
               if (goal > 0) {
//                 console.log("Best Move: " + n.move.toString() + ", moves = " + moves(n.board) + ", player = " + node.board.player);
                   node.best = ix;
                   node.goal = goal;
                   break;
               }
               if (n.board.player != node.board.player) {
                   goal = -goal;
               }
               n.goal = goal;
           } else {
               n.board.moves = Dagaz.AI.generate(ctx, n.board);
               if (n.board.moves.length == 0) {
                   node.goal = Dagaz.AI.NO_MOVE_GOAL;
                   if (node.goal > 0) {
//                     console.log("Best Move: " + n.move.toString() + ", moves = " + moves(n.board) + ", player = " + node.board.player);
                       node.best = ix;
                   }
                   break;
               }
           }
      }
  }
  if (!_.isUndefined(node.best)) {
      result = node.best;
  }
  return result;
}

MaxMinAi.prototype.changeCache = function(ctx, board) {
  if (!_.isUndefined(ctx.cache) && (board.zSign != 0)) {
      for (var i = 0; i < ctx.cache.length - 1; i++) {
           if ((!_.isUndefined(ctx.cache[i].board)) && (ctx.cache[i].board.zSign == board.zSign)) {
               if (!_.isUndefined(board.move)) {
                   if (board.move.toString() != ctx.cache[i].move.toString()) continue;
               }
               if (!_.isUndefined(ctx.cache[i].cache)) {
                   console.log("Cache found: " + ctx.cache[i].move.toString());
                   ctx.hwm   = ctx.cache[ix].hwm;
                   ctx.board = ctx.cache[i].board;
                   ctx.cache = ctx.cache[i].cache;
                   return;
               }
           }
      }
  }
  delete ctx.cache;
}

MaxMinAi.prototype.setCache = function(ctx, ix) {
  ctx.hwm   = ctx.cache[ix].hwm;
  ctx.board = ctx.cache[ix].board;
  ctx.cache = ctx.cache[ix].cache;
}

MaxMinAi.prototype.update = function(ctx, node, eval) {
  if (_.isUndefined(node.eval)) {
      node.eval = eval;
  } else {
     if (ctx.board.player == node.board.player) {
         if (node.eval < eval) {
             node.eval = eval;
         }
     } else {
         if (node.eval > eval) {
             node.eval = eval;
         }
     }
  }
}

MaxMinAi.prototype.goal = function(ctx, node) {
  var g = node.goal * MAXVALUE;
  if (node.board.player == ctx.board.player) {
      return g;
  } else {
      return -g;
  }
}

MaxMinAi.prototype.getPrice = function(ctx, board, move) {
  for (var i = 0; i < move.actions.length; i++) {
      if ((move.actions[i][0] !== null) && (move.actions[i][1] !== null)) {
           var piece = board.getPiece(move.actions[i][0][0]);
           if (piece === null) return 0;
           return ctx.design.price[piece.type];
      }
  }
  return 0;
}

MaxMinAi.prototype.simulate = function(ctx, node, deep) {
  if (!_.isUndefined(Dagaz.AI.isForced)) {
      while (deep < this.params.MAX_DEEP) {
          this.expand(ctx, node);
          if (!_.isUndefined(node.goal)) break;
          var best  = null;
          var price = null;
          for (var ix = 0; ix < node.cache.length; ix++) {
              var n = node.cache[ix];
              if (!_.isUndefined(n.goal)) {
                  best = ix;
                  break;
              }
              if (Dagaz.AI.isForced(ctx.design, node.board, n.move)) {
                  var x = this.getPrice(ctx, node.board, n.move);
                  if ((best === null) || (price > x)) {
                      best = ix;
                      price = x;
                  }
              }
          }
          if (best === null) break;
          node = node.cache[best];
          deep++;
      }
  }
  if (!_.isUndefined(node.goal)) {
      node.eval = this.goal(ctx, node);
      return;
  }
  return Dagaz.AI.eval(ctx.design, this.params, node.board, ctx.board.player) - ctx.eval;
}

MaxMinAi.prototype.proceed = function(ctx, node, deep) {
  if (!deep) deep = 0;
  this.expand(ctx, node);
  if (!_.isUndefined(node.goal)) {
      node.eval = this.goal(ctx, node);
      return;
  }
  if (deep < this.params.MIN_DEEP) {
      var f = false;
      while ((node.hwm < node.cache.length) && (Date.now() - ctx.timestamp < this.params.AI_FRAME)) {
           var n = node.cache[node.hwm];
           if (!_.isUndefined(n.eval) && !_.isUndefined(node.eval) && (n.eval == node.eval)) {
               f = true;
           }
           this.proceed(ctx, n, deep + 1);
           if (!f) {
               this.update(ctx, node, n.eval);
           }
           node.hwm++;
      }
      if (f) {
           delete node.eval;
           for (var ix = 0; ix < node.hwm; ix++) {
                var n = node.cache[ix];
                this.update(ctx, node, n.eval);
           }
      }
  } else {
      node.eval = this.simulate(ctx, node, deep);
  }
}

MaxMinAi.prototype.setContext = function(ctx, board) {
  if (this.parent) {
      this.parent.setContext(ctx, board);
  }
  ctx.board = board;
  ctx.timestamp = Date.now();
  this.changeCache(ctx, board);
}

MaxMinAi.prototype.getMove = function(ctx) {
  ctx.board.moves = Dagaz.AI.generate(ctx, ctx.board);
  if (ctx.board.moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  var ix = this.expand(ctx, ctx);
  if (ix === null) {
      _.each(ctx.cache, function(node) {
         this.expand(ctx, node);
      }, this);
      ctx.eval = Dagaz.AI.eval(ctx.design, this.params, ctx.board, ctx.board.player);
      ctx.timestamp = Date.now();
      while (Date.now() - ctx.timestamp < this.params.AI_FRAME) {
          this.proceed(ctx, ctx);
      }
      var eval = -MAXVALUE;
      for (var i = 0; i < ctx.cache.length; i++) {
           var node = ctx.cache[i];
           if (!_.isUndefined(node.best)) continue;
           if (_.isUndefined(node.eval))  continue;
           if ((ix === null) || (node.eval > eval)) {
                ix = i;
                eval = node.eval;
           } else {
                if ((node.eval == eval) && (_.random(0, 10) > this.params.NOISE_FACTOR)) {
                    ix = i;
                }
           }
      }
  }
  if (ix !== null) {
      var r = {
           done: true,
           move: ctx.cache[ix].move,
           time: Date.now() - ctx.timestamp,
           ai:  "maxmin"
      };
      this.setCache(ctx, ix);
      return r;
  } else {
      delete ctx.cache;
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

})();
