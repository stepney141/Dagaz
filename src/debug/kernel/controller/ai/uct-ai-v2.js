(function() {

Dagaz.AI.AI_FRAME     = 5000;
Dagaz.AI.MIN_DEEP     = 5;
Dagaz.AI.NOISE_FACTOR = 5;
Dagaz.AI.NO_MOVE_GOAL = 1;
Dagaz.AI.WIN_FACTOR   = 100;

function UctAi(params, parent) {
  this.params = params;
  this.parent = parent;
  if (_.isUndefined(this.params.AI_FRAME)) {
      this.params.AI_FRAME = Dagaz.AI.AI_FRAME;
  }
  if (_.isUndefined(this.params.MIN_DEEP)) {
      this.params.MIN_DEEP = Dagaz.AI.MIN_DEEP;
  }
  if (_.isUndefined(this.params.NOISE_FACTOR)) {
      this.params.NOISE_FACTOR = Dagaz.AI.NOISE_FACTOR;
  }
  if (_.isUndefined(this.params.WIN_FACTOR)) {
      this.params.WIN_FACTOR = Dagaz.AI.WIN_FACTOR;
  }
  if (_.isUndefined(this.params.UCT_COEFF)) {
      this.params.UCT_COEFF = Math.sqrt(2);
  }
  if (_.isUndefined(this.params.WIN_WEIGHT)) {
      this.params.WIN_WEIGHT = 0.8;
  }
  if (_.isUndefined(this.params.LOSS_WEIGHT)) {
      this.params.LOSS_WEIGHT = -0.2;
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

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var pos = null;
  _.each(move.actions, function(a) {
      if (a[0] !== null) {
          if (a[1] === null) {
              pos = a[0][0];
          } else {
              var piece = board.getPiece(a[1][0]);
              if ((piece !== null) && (piece.player !== board.player)) {
                  pos = a[1][0];
              }
          }
      }
  });
  if (pos !== null) {
      return 1;
  } else {
      return 0;
  }
}

UctAi.prototype.setCache = function(ctx, ix) {
  // TODO:
}

var setup = function(design, board, player) {
  var e = "";
  _.each(design.allPositions(), function(p) {
      var piece = board.getPiece(p);
      if ((piece !== null) && (piece.player != player)) {
          if (e != "") e = e + ",";
          e = e + Dagaz.Model.posToString(p, design) + "=" + piece.type;
      }
  });
  var f = "";
  _.each(design.allPositions(), function(p) {
      var piece = board.getPiece(p);
      if ((piece !== null) && (piece.player == player)) {
          if (f != "") f = f + ",";
          f = f + Dagaz.Model.posToString(p, design) + "=" + piece.type;
      }
  });
  return " [" + e + "/" + f + "]";
}

var moves = function(board) {
  var e = "";
  while (board.parent) {
      if (e != "") e = e + "; ";
      e = e + board.move.toString();
      board = board.parent;
  }
  return e;
}

UctAi.prototype.expand = function(ctx, node) {
  var result = null;
  if (_.isUndefined(node.cache)) {
      node.cache = [];
  }
  node.board.moves = Dagaz.AI.generate(ctx, node.board);
  if (node.board.moves.length != node.cache.length) {
      node.cache = _.chain(node.board.moves)
       .map(function(m) {
           return {
               move:  m,
               board: node.board.apply(m),
               cnt:   0,
               loss:  0,
               win:   Dagaz.AI.heuristic(this, ctx.design, node.board, m)
           };
        }, this)
       .filter(function(n) {
           return n.win >= 0;
        }).value();
      node.all = _.chain(node.cache)
       .map(function(n) {
           return n.win;
        })
       .reduce(function(acc, x) {
           return acc + x;
        }, 0).value() + 1;
      for (var ix = 0; ix < node.cache.length; ix++) {
           n = node.cache[ix];
           n.all = n.win;
           var goal = n.board.checkGoals(ctx.design, node.board.player);
           if (goal !== null) {
               if (goal > 0) {
//                 console.log("Best Move: " + n.move.toString() + ", setup = " + setup(ctx.design, n.board, ctx.board.player) + ", moves = " + moves(n.board));
                   node.best = ix;
                   break;
               }
               n.goal = goal;
           } else {
               n.board.moves = Dagaz.AI.generate(ctx, n.board);
               if (n.board.moves.length == 0) {
                   n.goal = Dagaz.AI.NO_MOVE_GOAL;
                   if (n.goal > 0) {
//                     console.log("Best Move: " + n.move.toString() + ", setup = " + setup(ctx.design, n.board, ctx.board.player) + ", moves = " + moves(n.board));
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

UctAi.prototype.shedule = function(ctx, node) {
  if (node.cache.length == 0) return null;
  if (node.cache.length == 1) return 0;
  if (!_.isUndefined(node.best)) return node.best;
  var mx = 0;
  var result = null;
  for (var ix = 0; ix < node.cache.length; ix++) {
      var child = node.cache[ix];
      var uct = Math.sqrt(Math.log(node.all) / child.all) * 
                this.params.UCT_COEFF + child.win / child.all;
      if ((result === null) || (mx < uct)) {
           result = ix;
           mx = uct;
      }
  }
  return result;
}

UctAi.prototype.random = function(ctx, node) {
  if (_.isUndefined(node.cache)) return null;
  if (node.cache.length == 0) return null;
  if (node.cache.length == 1) return 0;
  return _.random(0, node.cache.length - 1);
}

UctAi.prototype.proceed = function(ctx, node) {
  var goal  = null;
  var stack = [];
  while ((goal === null) && (stack.length < this.params.MIN_DEEP)) {
      stack.push(node);
      this.expand(ctx, node);
      var ix = null;
      if (stack.length == 1) {
          ix = this.shedule(ctx, node);
      } else {
          ix = this.random(ctx, node);
      }
      if (ix === null) break;
      if (!_.isUndefined(node.cache[ix].goal)) {
          goal = node.cache[ix].goal;
          if (node.board.player != ctx.board.player) {
              goal = -goal;
          }
          break;
      }
      node = node.cache[ix];
  }
  if (goal !== null) {
      goal *= this.params.WIN_FACTOR;
  }
  if (!_.isUndefined(Dagaz.AI.eval) && (goal === null)) {
      goal = Dagaz.AI.eval(ctx.design, this.params, node.board, ctx.board.player) -
             Dagaz.AI.eval(ctx.design, this.params, ctx.board, ctx.board.player);
  }
  _.each(stack, function(n) {
      var c = 1;
      if (goal !== null) {
          var g = goal;
          if (n.board.player != ctx.board.player) {
              g = -g;
          }
          if (g > 0) {
              n.win += g;
              c = g;
          }
          if (g < 0) {
              n.loss -= g;
              c = -g;
          }
      }
      n.all += c;
      n.cnt++;
  });
}

UctAi.prototype.dump = function(node) {
  console.log("UCT: " + node.move.toString() + ", win/loss/all = " + node.win + "/" + node.loss + "/" + node.all);
}

UctAi.prototype.setContext = function(ctx, board) {
  if (this.parent) {
      this.parent.setContext(ctx, board);
  }
  ctx.board = board;
  ctx.timestamp = Date.now();
  ctx.cache = [];
}

UctAi.prototype.getMove = function(ctx) {
  ctx.board.moves = Dagaz.AI.generate(ctx, ctx.board);
  if (ctx.board.moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  var result = this.expand(ctx, ctx);

/*_.each(ctx.cache, function(node) {
      this.dump(node);
  }, this); */

  if (result === null) {
      _.each(ctx.cache, function(node) {
         this.expand(ctx, node);
      }, this);
      ctx.timestamp = Date.now();
      while (Date.now() - ctx.timestamp < this.params.AI_FRAME) {
         this.proceed(ctx, ctx);
      }
      var mx = 0;
      for (var ix = 0; ix < ctx.cache.length; ix++) {
           var node = ctx.cache[ix];
           if (!_.isUndefined(node.best)) continue;
           this.dump(node);
           if (node.all == 0) continue;
           var eval = (this.params.WIN_WEIGHT * node.win + this.params.LOSS_WEIGHT * node.loss) / node.all;
//         var eval = node.win / node.all;
           if ((result === null) || (mx < eval)) {
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
