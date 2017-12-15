(function() {

var MAXVALUE              = 1000000;

Dagaz.AI.AI_FRAME         = 5000;
Dagaz.AI.NOISE_FACTOR     = 15;
Dagaz.AI.MATERIAL_FACTOR  = 1;
Dagaz.AI.MOBILITY_FACTOR  = 1;

function AggressiveAi(params, parent) {
  this.params = params;
  this.parent = parent;
  if (_.isUndefined(this.params.AI_FRAME)) {
      this.params.AI_FRAME = Dagaz.AI.AI_FRAME;
  }
  if (_.isUndefined(this.params.NOISE_FACTOR)) {
      this.params.NOISE_FACTOR = Dagaz.AI.NOISE_FACTOR;
  }
  if (_.isUndefined(this.params.MATERIAL_FACTOR)) {
      this.params.MATERIAL_FACTOR = Dagaz.AI.MATERIAL_FACTOR;
  }
  if (_.isUndefined(this.params.MOBILITY_FACTOR)) {
      this.params.MOBILITY_FACTOR = Dagaz.AI.MOBILITY_FACTOR;
  }
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "aggressive") || (type == "common") || (type == "1") || (type == "2")) {
      return new AggressiveAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

Dagaz.AI.eval_v4 = function(design, params, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = design.price[piece.type];
          if (!_.isUndefined(board.cover)) {
              // TODO: Штрафы за угрозы ценным фигурам
              // TODO: Бонусы за угрозы ценным фигурам противника
              // TODO: Учитывать перемещение последней фигуры (board.move)


          }
          if (piece.player != player) {
              v = -v;
          }
          r += v;
      }
  });
  return r;
}

Dagaz.AI.heuristic_v4 = function(ai, design, board, move) {
  var r = 0;
  _.each(move.actions, function(a) {
      if (a[0] !== null) {
          if (a[1] === null) {
              var piece = board.getPiece(a[0][0]);
              if ((piece !== null) && (piece.player != player)) {
                   r += design.price[piece.type];
              }
          } else {
              var pos = a[1][0];
              var piece = board.getPiece(pos);
              if ((piece !== null) && (piece.player != player)) {
                   r += design.price[piece.type];
              }
          }
          // TODO: Учитывать сбросы и превращения фигур
          // TODO: Бонусы за увод ценных фигур из под удара
          // TODO: Бонусы за уничтожение угроз ценным фигурам
          // TODO: Штрафы за ход под удар

      }
  });
  return r;
}

AggressiveAi.prototype.mobility = function(design, board) {
  var r = board.moves.length;
  _.each(board.moves, function(move) {
      r += Dagaz.AI.heuristic_v4(this, design, board, move);
  });
  return r;
}

AggressiveAi.prototype.expand = function(ctx) {
  if (_.isUndefined(ctx.cache)) {
      ctx.board.moves = Dagaz.AI.generate(ctx, ctx.board);
      ctx.cache = _.map(ctx.board.moves, function(m) {
          var b = ctx.board.apply(m);
          return {
             move:   m,
             board:  b,
             goal:   b.checkGoals(ctx.design, ctx.board.player),
             weight: Dagaz.AI.heuristic_v4(this, ctx.design, ctx.board, m)
          };
      }, this);
      if (this.params.NOISE_FACTOR > 0) {
          _.each(ctx.cache, function(n) {
             n.weight *= this.params.NOISE_FACTOR + 1;
             n.weight += _.random(0, this.params.NOISE_FACTOR);
          }, this);
      }
      ctx.cache = _.sortBy(ctx.cache, function(n) {
           if (n.goal !== null) {
               return -n.goal * MAXVALUE;
           }
           return -n.weight;
      });
  }
}

AggressiveAi.prototype.dump = function(ctx, node) {
  console.log("Dump: " + node.move.toString() + ", a = " + node.a + ", b = " + node.b + ", h = " + node.weight);
}

AggressiveAi.prototype.setContext = function(ctx, board) {
  if (this.parent) {
      this.parent.setContext(ctx, board);
  }
  ctx.board     = board;
  ctx.timestamp = Date.now();
  delete ctx.cache;
  delete ctx.best;
}

AggressiveAi.prototype.getMove = function(ctx) {
  ctx.board.moves = Dagaz.AI.generate(ctx, ctx.board);
  if (ctx.board.moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  this.expand(ctx);
  var cover = ctx.board.getCover(ctx.design);
  ctx.timestamp = Date.now();
  var ix  = 0;
  var mxa = -MAXVALUE;
  var mxb = -MAXVALUE;
  while ((ix < ctx.cache.length) && ((Date.now() - ctx.timestamp < this.params.AI_FRAME) || _.isUndefined(ctx.best))) {
      var node = ctx.cache[ix];
      node.board.cover = cover;
      node.a = Dagaz.AI.eval_v4(ctx.design, this.params, node.board, ctx.board.player);
      if (node.a == MAXVALUE) {
          ctx.best = ix;
          break;
      }
      if (mxa <= node.a) {
          mxa  = node.a;
          if ((node.goal !== null) && (node.goal > 0)) {
              ctx.best = ix;
              break;
          }
          node.board.moves = Dagaz.AI.generate(ctx, node.board);
          if (node.board.moves.length == 0) {
              ctx.best = ix;
              break;
          }
          var m = _.chain(node.board.moves)
           .map(function(m) {
                var b = node.board.apply(m.move);
                return {
                   move:   m,
                   board:  b,
                   goal:   b.checkGoals(ctx.design, node.board.player),
                   weight: Dagaz.AI.heuristic_v4(this, ctx.design, node.board, m)
                };
            }, this)
           .max(function(n) {
                if (n.goal !== null) {
                    return n.goal * MAXVALUE;
                }
                return n.weight;
            }).value();
          if (m.goal !== null) {
              node.b = -m.goal * MAXVALUE;
          } else {
              node.b = Dagaz.AI.eval_v4(ctx.design, this.params, m.board, ctx.board.player);
              if (this.params.MOBILITY_FACTOR != 0) {
                  m.board.moves = Dagaz.AI.generate(ctx, m.board);
                  node.b *= this.params.MATERIAL_FACTOR;
                  node.b += this.mobility(ctx.design, m.board);
              }
          }
          if (this.params.NOISE_FACTOR > 0) {
              node.b += _.random(0, this.params.NOISE_FACTOR);
          }
          if (mxb < node.b) {
              mxb = node.b;
              this.dump(ctx, node);
              ctx.best = ix;
          }
      }
      ix++;
  }
  console.log(ix + "/" + ctx.cache.length);
  if (!_.isUndefined(ctx.best)) {
      return {
           done: true,
           move: ctx.cache[ctx.best].move,
           time: Date.now() - ctx.timestamp,
           ai:  "aggressive"
      };
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

})();
