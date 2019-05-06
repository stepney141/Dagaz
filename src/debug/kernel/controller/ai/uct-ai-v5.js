(function() {

var MAXVALUE          = 1000000;

Dagaz.AI.AI_FRAME     = 3000;
Dagaz.AI.KING         = 0;
Dagaz.AI.ONE_KING     = true;
Dagaz.AI.MIN_DEEP     = 5;
Dagaz.AI.MAX_DEEP     = 10;
Dagaz.AI.MAX_MOVES    = 100;
Dagaz.AI.WIN_EVAL     = 100;
Dagaz.AI.DRAW_EVAL    = 50;
Dagaz.AI.NOISE_FACTOR = 10;
Dagaz.AI.UCT_COEFF    = Math.sqrt(2);

function UctAi(parent) {
  this.parent = parent;
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "uct") || (type == "common") || (type == "1") || (type == "2")) {
      return new UctAi(parent);
  } else {
      return findBot(type, params, parent);
  }
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  // TODO: cover
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
  var r = 1;
  var captured = [];
  var price = null;
  _.each(move.actions, function(a) {
      if ((a[0] !== null) && (a[1] === null)) {
          var piece = board.getPiece(a[0][0]);
          if (piece !== null) {
              r += design.price[piece.type];
          }
          captured.push(a[0][0]);
      }
  });
  _.each(move.actions, function(a) {
      if ((a[0] !== null) && (a[1] !== null)) {
          var piece = board.getPiece(a[1][0]);
          if (piece !== null) {
              r += design.price[piece.type];
          }
          piece = board.getPiece(a[0][0]);
          if (price === null) {
              price = design.price[piece.type];
          }
          if (_.indexOf(captured, a[1][0]) >= 0) {
              r -= price;
              return;
          }
          if (piece !== null) {
              r -= (design.price[piece.type] / 2) | 0;
          }
          if ((a[2] !== null) && (a[2][0].type != piece.type)) {
              r += design.price[a[2][0].type];
          }
      }
  });
  return r;
}

var uct = function(win, count, all) {
  return Math.sqrt(Math.log(all) / count) * Dagaz.AI.UCT_COEFF +
         win / count;
}

UctAi.prototype.simulate = function(ctx, board, player, move) {
  var deep = 0;
  var positions = null;
  // TODO: Return null if bad exchange

  while (deep < Dagaz.AI.MAX_DEEP) {
      var moves = Dagaz.AI.generate(ctx, board);
      if (moves.length == 0) {
          var goal = Dagaz.Model.checkGoals(ctx.design, board, player);
          if ((goal === null) && (board.player != player)) return Dagaz.AI.WIN_EVAL;
          if (goal > 0) return Dagaz.AI.WIN_EVAL;
          if (goal == 0) return Dagaz.AI.DRAW_EVAL;
          return null;
      }
      if (board.player == player) {
          deep++;
          positions = [];
          for (var pos = 0; pos < ctx.design.positions.length; pos++) {
               var piece = board.getPiece(pos);
               if ((piece !== null) && (piece.player == player) && (piece.type == Dagaz.AI.KING)) {
                   positions.push(pos);
                   if (Dagaz.AI.ONE_KING) break;
               }
          }
          // TODO: positions = null, if checks

      } else {
          if ((deep >= Dagaz.AI.MIN_DEEP) && (positions !== null)) {
               var f = true;
               for (var i = 0; i < moves.length; i++) {
                    for (var j = 0; j < moves[i].actions.length; j++) {
                         var a = moves[i].actions[j];
                         if ((a[0] !== null) && (a[1] !== null) && (_.indexOf(positions, a[1][0]) >= 0)) {
                             f = false;
                         }
                         if ((a[0] !== null) && (a[1] === null) && (_.indexOf(positions, a[0][0]) >= 0)) {
                             f = false;
                         }
                    }
               }
               if (f) break;
          }
      }
      var nodes = [];
      var all = 0;
      for (var i = 0; i < moves.length; i++) {
           var weight = Dagaz.AI.heuristic(this, ctx.design, board, moves[i]);
           if (weight > 0) {
               nodes.push({
                   m: moves[i],
                   h: weight
               });
               all += weight;
           }
      }
      var lvl = _.random(0, all - 1);
      var all = 0;
      for (var i = 0; i < nodes.length; i++) {
          all += nodes[i].h;
          if (lvl < all) {
              if ((board.player == player) && (positions !== null)) {
                  for (var j = 0; j < nodes[i].m.actions.length; j++) {
                       var a = nodes[i].m.actions[j];
                       if ((a[0] !== null) && (a[1] !== null)) {
                           positions.push(a[1][0]);
                       }
                  }
              }
              board = board.apply(nodes[i].m);
              break;
          }
      }
  }
  return Dagaz.AI.eval(ctx.design, [], board, player);
}

UctAi.prototype.setContext = function(ctx, board) {
  if (this.parent) {
      this.parent.setContext(ctx, board);
  }
  ctx.timestamp = Date.now();
  ctx.board = board;
  delete ctx.cache;
}

UctAi.prototype.getMove = function(ctx) {
  var moves = Dagaz.AI.generate(ctx, ctx.board);
  if (moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  if (moves.length == 1) {
      return {
           done: true,
           move: moves[0],
           time: Date.now() - ctx.timestamp,
           ai:  "once"
      };
  }
  ctx.cache = _.map(moves, function(move) {
      var weight = Dagaz.AI.heuristic(this, ctx.design, ctx.board, move);
      if (Dagaz.AI.NOISE_FACTOR > 0) {
          weight = weight * Dagaz.AI.NOISE_FACTOR;
          weight += _.random(0, Dagaz.AI.NOISE_FACTOR - 1);
      }
      return {
          m: move,
          h: weight,
          w: 0,
          c: 1
      };
  });
  if (ctx.cache.length > Dagaz.AI.MAX_MOVES) {
      ctx.cache =  _.sortBy(ctx.cache, function(n) {
          return -n.h;
      });
      var cache = [];
      for (var i = 0; i < Dagaz.AI.MAX_MOVES; i++) {
          cache.push(ctx.cache[i]);
      }
      ctx.cache = cache;
  }
  ctx.timestamp = Date.now();
  var start = Dagaz.AI.eval(ctx.design, [], ctx.board, ctx.board.player);
  var cnt = 1;
  while (Date.now() - ctx.timestamp < Dagaz.AI.AI_FRAME) {
      var node = _.max(ctx.cache, function(n) {
          return uct(n.w, n.c, cnt);
      });
      var board  = ctx.board.apply(node.m);
      var result = this.simulate(ctx, board, ctx.board.player, node.m);
      if ((result !== null) && (result > start)) {
          result -= start;
          if (result > Dagaz.AI.WIN_EVAL) {
              result = Dagaz.AI.WIN_EVAL;
          }
          node.w += result;
          node.c += result;
      } else {
          node.c++;
          cnt++;
      }
  }
  var best = _.max(ctx.cache, function(n) {
      return n.w;
  });
  if (best !== null) {
      return {
           done: true,
           move: best.m,
           time: Date.now() - ctx.timestamp,
           ai:  "uct"
      };
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

})();
