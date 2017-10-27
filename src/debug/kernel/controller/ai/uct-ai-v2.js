(function() {

Dagaz.AI.AI_FRAME     = 5000;
Dagaz.AI.MIN_DEEP     = 5;
Dagaz.AI.MAX_DEEP     = 10;
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
  if (_.isUndefined(this.params.MAX_DEEP)) {
      this.params.MAX_DEEP = Dagaz.AI.MAX_DEEP;
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
      this.params.WIN_WEIGHT = 0.7;
  }
  if (_.isUndefined(this.params.LOSS_WEIGHT)) {
      this.params.LOSS_WEIGHT = -0.3;
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
      var piece = null;
      if (a[0] !== null) {
          var pos = a[0][0];
          if (a[1] === null) {
              piece = board.getPiece(pos);
              r += price(design, piece, board.player);
          } else {
              var target = a[1][0];
              piece = board.getPiece(target);
              r += price(design, piece, board.player);
/*            if (!_.isUndefined(Dagaz.AI.defendStatus) && (Dagaz.AI.defendStatus(design, board, board.player, target, pos) < 0)) {
                  piece = board.getPiece(pos);
                  r += price(design, piece, board.player);
              } */
          }
      }
  });
  return r;
}

Dagaz.AI.getChessForcedMove = function(ctx, board, player) {
  var pos = board.lastt;
  board.moves = Dagaz.AI.generate(ctx, board);
  var moves = _.filter(function(m) {
      if ((m.actions.length != 1) || (m.actions[0][0] === null) || (m.actions[0][1] === null)) return false;
      return m.actions[0][1][0] == pos;
  });
  if (moves.length == 0) return null;
  return _.min(moves, function(m) {
       var piece = board.getPiece(m.actions[0][0][0]);
       if (piece === null) return MAXVALUE;
       return ctx.design.price[piece.type];
  });
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

UctAi.prototype.changeCache = function(ctx, board) {
  // TODO:
}

UctAi.prototype.setCache = function(ctx, ix) {
  ctx.all   = ctx.cache[ix].all;
  ctx.board = ctx.cache[ix].board;
  ctx.cache = ctx.cache[ix].cache;
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
      if (stack.length < 2) {
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
  if (!_.isUndefined(Dagaz.AI.getForcedMove)) {
      while ((goal === null) && (stack.length < this.params.MAX_DEEP)) {
          var move = Dagaz.AI.getForcedMove(ctx, node.board, ctx.board.player);
          if (move === null) break;
          console.log("Forced Move: " + move.toString());
          stack.push(node);
          this.expand(ctx, node);
          var child = null;
          for (var ix = 0; ix < node.cache.length; ix++) {
               if (node.cache[ix].move.toString() == move.toString()) {
                   child = node.cache[ix];
                   break;
               }
          }
          if (child === null) break;
          if (!_.isUndefined(child.goal)) {
              goal = child.goal;
              if (node.board.player != ctx.board.player) {
                  goal = -goal;
              }
              break;
          }
          node = child;
      }
  }
  if (goal !== null) {
      goal *= this.params.WIN_FACTOR;
  }
  if (!_.isUndefined(Dagaz.AI.eval) && (goal === null)) {
      goal = Dagaz.AI.eval(ctx.design, this.params, node.board, ctx.board.player) -
             Dagaz.AI.eval(ctx.design, this.params, ctx.board, ctx.board.player);
/*    if (goal > 0) {
          console.log("Goal: " + goal + ", setup: " + setup(ctx.design, node.board, ctx.board.player) + ", moves: " + moves(node.board));
      }*/
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
  console.log("UCT: " + node.move.toString() + ", win/loss/all/cnt = " + node.win + "/" + node.loss + "/" + node.all + "/" + node.cnt);
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
  }, this);*/
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
