(function() {

var MAXVALUE          = 1000000;

Dagaz.AI.MIN_DEEP     = 5;
Dagaz.AI.MAX_DEEP     = 10;
Dagaz.AI.NOISE_FACTOR = 5;
Dagaz.AI.AI_FRAME     = 3000;

function UctAi(params, parent) {
  this.params = params;
  this.parent = parent;
  if (_.isUndefined(this.params.NOISE_FACTOR)) {
      this.params.NOISE_FACTOR = Dagaz.AI.NOISE_FACTOR;
  }
  if (_.isUndefined(this.params.AI_FRAME)) {
      this.params.AI_FRAME = Dagaz.AI.AI_FRAME;
  }
  if (_.isUndefined(this.params.MIN_DEEP)) {
      this.params.MIN_DEEP = Dagaz.AI.MIN_DEEP;
  }
  if (_.isUndefined(this.params.MAX_DEEP)) {
      this.params.MAX_DEEP = Dagaz.AI.MAX_DEEP;
  }
  if (_.isUndefined(this.params.UCT_COEFF)) {
      this.params.UCT_COEFF = Math.sqrt(2);
  }
  if (_.isUndefined(this.params.WIN_WEIGHT)) {
      this.params.WIN_WEIGHT = 0.3;
  }
  if (_.isUndefined(this.params.LOSS_WEIGHT)) {
      this.params.LOSS_WEIGHT = -0.7;
  }
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "uct") || (type == "common")) {
      return new UctAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

Dagaz.AI.getChessForcedMove = function(ctx, board, player) {
  var pos = board.lastt;
  board.moves = Dagaz.AI.generate(ctx, board);
  var moves = _.chain(board.moves)
   .filter(function(m) {
       return (m.actions.length == 1) && (m.actions[0][0] !== null) && (m.actions[0][1] !== null);
    })
   .filter(function(m) {
       return m.actions[0][1][0] == pos;
    })
   .map(function(m) {
       var v = MAXVALUE;
       var piece = board.getPiece(m.actions[0][0][0]);
       if (piece !== null) {
           v = ctx.design.price[piece.type];
       }
       return {
           value: v,
           move:  m
       };
    })
   .sortBy(function(f) {
       return f.value;
    })
   .map(function(f) {
       return f.move;
    }).value();
  if (moves.length > 0) {
      return moves[0];
  } else {
      return null;
  }
}

Dagaz.AI.getCheckersForcedMove = function(ctx, board, player) {
  board.moves = Dagaz.AI.generate(ctx, board);
  var moves = _.filter(board.moves, function(m) {
      return m.actions.length > 1;
  });
  if (moves.length == 0) return null;
  if (moves.length == 1) return moves[0];
  var ix = _.random(0, moves.length - 1);
  return moves[ix];
}

Dagaz.AI.heuristic = function() {
  return 1;
}

MaxMinAi.prototype.setCache = function(ctx, ix) {
  ctx.board = ctx.cache[ix].board;
  ctx.cache = ctx.cache[ix].cache;
  ctx.all   = ctx.cache[ix].all;
}

UctAi.prototype.changeCache = function(ctx, board) {
  ctx.board = board;
  if (!_.isUndefined(ctx.cache) && (board.zSign != 0)) {
      for (var i = 0; i < ctx.cache.length; i++) {
           if (ctx.cache[i].board.zSign == board.zSign) {
               if (!_.isUndefined(board.move)) {
                   if (board.move.toString() != ctx.cache[i].move.toString()) continue;
               }
               if (!_.isUndefined(ctx.cache[i].cache)) {
                   ctx.board = ctx.cache[i].board;
                   ctx.cache = ctx.cache[i].cache;
                   ctx.all   = ctx.cache[i].all;
                   return;
               }
           }
      }
  }
}

UctAi.prototype.setContext = function(ctx, board) {
  if (this.parent) {
      this.parent.setContext(ctx, board);
  }
  ctx.timestamp = Date.now();
  this.changeCache(ctx, board);
}

UctAi.prototype.expand = function(ctx, node) {
  if (_.isUndefined(node.cache)) {
      node.cache = _.chain(node.board.moves)
       .map(node.board.moves, function(m) {
            return {
                deep: 0,
                move: m,
                loss: 0,
                win:  Dagaz.AI.heuristic(this, ctx.design, node.board, m)
            };
        }, this)
       .filter(function(n) {
            return win >= 0;
        }).value();
       var cnt = _.chain(node.cache)
        .map(function(n) {
            return win;
         }).max().value();
       _.each(node.cache, function(n) {
            n.all = cnt;
       }).
      node.hwm = 0;
  }
}

UctAi.prototype.shedule = function(ctx, node) {
  if (node.cache.length == 0) return null;
  if (node.cache.length == 1) return 0;
  if (node.hwm > 0) {
      node.hwm--;
      return node.hwm;
  }
  var mx = 0;
  var result = null;
  for (var ix = 0; ix < node.cache.length; ix++) {
      var child = node.cache[ix];
      var uct = Math.sqrt(Math.log(node.all) / child.all) * 
                this.params.UCT_COEFF + child.win / child.all;
      if ((result === null) || (uct > mx)) {
           result = ix;
           mx = uct;
      }
  }
  return result;
}

UctAi.prototype.random = function(ctx, node) {
  if (node.cache.length == 0) return null;
  if (node.cache.length == 1) return 0;
  return _.random(0, node.cache.length - 1);
}

UctAi.prototype.proceed = function(ctx, board, node, stack) {
  var goal = null;
  for (var deep = 0; deep < this.params.MIN_DEEP; deep++) {
      if (_.isUndefined(node.board)) {
          node.board = board.apply(node.move);
      }
      stack.push(node);
      goal = node.board.checkGoals(ctx.design, board.player);
      if (goal !== null) {
          if (board.player != ctx.board.player) {
              goal = -goal;
          }
          if ((deep == 0) && (goal > 0)) {
              return true;
          }
          break;
      }
      board  = node.board;
      var ix = null;
      if (_.isUndefined(node.cache)) {
          this.expand(ctx, node);
          ix = this.random(ctx, node);
      }
      if (node.cache.length == 0) {
          if (node.board.player == ctx.board.player) {
              goal = -1;
          } else {
              goal = 1;
          }
          if ((deep == 0) && (goal > 0)) {
              return true;
          }
          break;
      }
      if (ix === null) {
          ix = this.shedule(ctx, node);
      }
      node = node.cache[ix];
  }
  if (!_.isUndefined(Dagaz.AI.getForcedMove) && (goal === null)) {
      for (; deep < this.params.MAX_DEEP; deep++) {
           if (_.isUndefined(node.board)) {
               node.board = board.apply(node.move);
           }
           stack.push(node);
           goal = node.board.checkGoals(ctx.design, board.player);
           if (goal !== null) {
               if (board.player != ctx.board.player) {
                   goal = -goal;
               }
               break;
           }
           this.expand(ctx, node);
           if (node.cache.length == 0) {
               if (node.board.player == ctx.board.player) {
                   goal = -1;
               } else {
                   goal = 1;
               }
               break;
           }
           var move = Dagaz.AI.getForcedMove(ctx, node.board, vtx.board.player);
           if (move === null) {
               break;
           }
           board = null;
           for (var ix = 0; ix < node.cache.length; ix++) {
                if (node.cache[ix].move.toString() == move.toString()) {
                    board = node.board;
                    node = node.cache[ix];
                    break;
                }
           }
           if (board === null) {
                console.log("Move " + move.toString() + " not found!");
                return false;
           }
      }
  }
  if (!_.isUndefined(Dagaz.AI.eval) && (goal === null) && (board !== null)) {
      if (Dagaz.AI.eval(ctx.design, this.params, ctx.board, ctx.board.player) <
          Dagaz.AI.eval(ctx.design, this.params, board, ctx.board.player)) {
          goal = 1;
      } else {
          goal = -1;
      }
  }
  _.each(stack, function(n) {
      var g = goal;
      if (n.board.player != ctx.board.player) {
          g = -g;
      }
      if (g > 0) {
          n.win++;
      }
      if (g < 0) {
          n.loss++;
      }
      n.all++;
  });
  if (stack.length > 1) {
      if (stack[1].deep < deep) {
          stack[1].deep = deep;
      }
  }
  return false;
}

UctAi.prototype.dump = function(node) {
  console.log("UCT: " node.move.toString() + ", deep = " + node.deep + ", win/loss/all = " + node.win + "/" + node.loss + "/" + node.all);
}

UctAi.prototype.getMove = function(ctx) {
  var result = null;
  ctx.board.moves = Dagaz.AI.generate(ctx, ctx.board);
  if (ctx.board.moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  this.expand(ctx, ctx);
  if (ctx.cache.length == 1) {
      result = 0;
  }
  ctx.hwm  = ctx.cache.length;
  while ((result === null) && ((ctx.hwm > 0) || (Date.now() - ctx.timestamp < this.params.AI_FRAME))) {
      var ix = this.shedule(ctx, ctx);
      if (ix === null) break;
      var stack = [ ctx ];
      if (this.proceed(ctx, ctx.board, ctx.cache[ix], stack)) {
          result = ix;
      }
  }
  var mx = 0;
  if (result === null) {
      for (var ix = 0; ix < ctx.cache.length; ix++) {
           var node = ctx.cache[ix];
           this.dump(node);
           var eval = (this.params.WIN_WEIGHT * node.win + this.params.LOSS_WEIGHT * node.loss) / node.all;
           if ((result === null) || (eval > mx)) {
                result = ix;
                mx = eval;
           } else {
                if ((eval == mx) && (_.random(0, 10) > this.params.NOISE_FACTOR)) {
                    result = ix;
                }
           }
      }
  }
  if (result !== null) {
      var r = {
           done: true,
           move: ctx.cache[result].move,
           time: Date.now() - ctx.timestamp,
           ai:  "uct"
      };
      this.setCache(ctx, result);
      return r;
  } else {
      ctx.cache = [];
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

})();
