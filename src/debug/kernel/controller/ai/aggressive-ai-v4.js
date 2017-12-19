(function() {

var MAXVALUE              = 1000000;

Dagaz.AI.AI_FRAME         = 5000;
Dagaz.AI.NOISE_FACTOR     = 15;
Dagaz.AI.MATERIAL_FACTOR  = 1;
Dagaz.AI.MOBILITY_FACTOR  = 1;

Dagaz.AI.CAPTURING_FACTOR = 10;
Dagaz.AI.PROMOTING_FACTOR = 10;
Dagaz.AI.CREATING_FACTOR  = 10;
Dagaz.AI.SUICIDE_FACTOR   = 10;

Dagaz.AI.ATTACKING_FACTOR = 1;
Dagaz.AI.DEFENDING_FACTOR = 1;
Dagaz.AI.KING_PRICE       = 1000;

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
  if (_.isUndefined(this.params.CAPTURING_FACTOR)) {
      this.params.CAPTURING_FACTOR = Dagaz.AI.CAPTURING_FACTOR;
  }
  if (_.isUndefined(this.params.PROMOTING_FACTOR)) {
      this.params.PROMOTING_FACTOR = Dagaz.AI.PROMOTING_FACTOR;
  }
  if (_.isUndefined(this.params.CREATING_FACTOR)) {
      this.params.CREATING_FACTOR = Dagaz.AI.CREATING_FACTOR;
  }
  if (_.isUndefined(this.params.SUICIDE_FACTOR)) {
      this.params.SUICIDE_FACTOR = Dagaz.AI.SUICIDE_FACTOR;
  }
  if (_.isUndefined(this.params.ATTACKING_FACTOR)) {
      this.params.ATTACKING_FACTOR = Dagaz.AI.ATTACKING_FACTOR;
  }
  if (_.isUndefined(this.params.DEFENDING_FACTOR)) {
      this.params.DEFENDING_FACTOR = Dagaz.AI.DEFENDING_FACTOR;
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
          if (piece.player != player) {
              v = -v;
          }
          r += v;
      }
  });
  return r;
}

Dagaz.AI.heuristic_v4 = function(ai, design, board, move) {
  var r        = 0;
  var captures = [];
  var start    = null;
  var stop     = null;
  var player   = board.player;
  _.each(move.actions, function(a) {
      if ((a[0] !== null) && (a[1] === null)) {
          var pos = a[0][0];
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player != player)) {
               r += design.price[piece.type] * ai.params.CAPTURING_FACTOR;
          }
          captures.push(pos);
      }
      if ((a[0] !== null) && (a[1] !== null)) {
          if (start === null) {
              start = a[0][0];
          }
          stop = a[1][0];
      }
  });
  _.each(move.actions, function(a) {
      if ((a[0] !== null) && (a[1] !== null)) {
          var pos = a[1][0];
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.player != player)) {
               r += design.price[piece.type] * ai.params.CAPTURING_FACTOR;
          }
          if (start !== null) {
              piece = board.getPiece(start);
              if (_.indexOf(captures, pos) >= 0) {
                  if (piece !== null) {
                      r -= design.price[piece.type] * ai.params.SUICIDE_FACTOR;
                  }
              }
              if (a[2] !== null) {
                  var promoted = a[2][0];
                  if (piece.type != promoted.type) {
                      r -= design.price[piece.type] * ai.params.SUICIDE_FACTOR;
                      if (promoted.player == player) {
                          r += design.price[promoted.type] * ai.params.PROMOTING_FACTOR;
                      }
                  }
              }
          }
      }
      if ((a[0] === null) && (a[1] !== null) && (a[2] !== null)) {
          var pos = a[1][0];
          var piece = board.getPiece(pos);
          if (piece !== null) {
              if (piece.player != player) {
                  r += design.price[piece.type] * ai.params.CAPTURING_FACTOR;
              }
          }
          piece = a[2][0];
          if (piece.player == player) {
              r += design.price[piece.type] * ai.params.CREATING_FACTOR;
          }
      }
  });
  if (!_.isUndefined(board.cover) && (ai.params.ATTACKING_FACTOR != 0) && (ai.params.DEFENDING_FACTOR != 0)) {
      var price = 0;
      if (start !== null) {
          var piece = board.getPiece(start);
          if (piece !== null) {
              price = design.price[piece.type];
          }
          for (var i = 0; i < board.cover[start].length; i++) {
              piece = board.getPiece(board.cover[start][i]);
              if ((piece !== null) && (piece.player != player)) {
                  r += price * ai.params.DEFENDING_FACTOR;
                  break;
              }
          }
      }
      if (stop !== null) {
          var cnt = 0;
          var sum = 0;
          _.each(board.cover[stop], function(pos) {
              var piece = board.getPiece(pos);
              if (piece !== null) {
                  if (piece.player != player) {
                      sum += design.price[piece.type];
                      cnt--;
                  } else {
                      sum -= design.price[piece.type];
                      if (price < Dagaz.AI.KING_PRICE) cnt++;
                  }
              }
          });
          if (cnt > 0) {
              r += sum * ai.params.ATTACKING_FACTOR;
          } else {
              r -= price * ai.params.DEFENDING_FACTOR;
          }
      }
  }
  return r;
}

AggressiveAi.prototype.analyze = function(design, board, player) {
  var r = 0;
  var cover = board.getCover(design);
  _.each(design.allPositions(), function(pos) {
      if (!_.isUndefined(cover[pos])) {
          var piece = board.getPiece(pos);
          if (piece !== null) {
              var f = _.chain(cover[pos])
               .map(function(pos) {
                    var p = board.getPiece(pos);
                    if (p === null) return null;
                    if (p.player != piece.player) return null;
                    return design.price[p.type];
                }).compact()
               .sortBy(function(price) {
                    return -price;
                }).value();
              var e = _.chain(cover[pos])
               .map(function(pos) {
                    var p = board.getPiece(pos);
                    if (p === null) return null;
                    if (p.player == piece.player) return null;
                    return design.price[p.type];
                }).compact()
               .sortBy(function(price) {
                    return -price;
                }).value();
              while ((e.length > 0) && (f.length > 0)) {
                  var fp = f.pop();
                  var ep  = e.pop();
                  if (fp > ep) {
                      e.push(ep);
                      break;
                  }
              }
              if (e.length > 0) {
                  if (piece.player == player) {
                      r -= design.price[piece.type] * this.params.DEFENDING_FACTOR;
                  } else {
                      r += design.price[piece.type] * this.params.ATTACKING_FACTOR;
                  }
              }
          }
      }
  }, this);
  return r;
}

AggressiveAi.prototype.mobility = function(design, board) {
  var r = board.moves.length;
  _.each(board.moves, function(move) {
      r += Dagaz.AI.heuristic_v4(this, design, board, move);
  }, this);
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
  ctx.board.getCover(ctx.design);
  this.expand(ctx);
  ctx.timestamp = Date.now();
  var ix  = 0;
  var mxa = 1 - MAXVALUE;
  var mxb = 1 - MAXVALUE;
  while ((ix < ctx.cache.length) && ((Date.now() - ctx.timestamp < this.params.AI_FRAME) || _.isUndefined(ctx.best))) {
      var node = ctx.cache[ix];
      node.a = Dagaz.AI.eval_v4(ctx.design, this.params, node.board, ctx.board.player);
      if (node.goal !== null) {
          if (node.goal > 0) {
              ctx.best = ix;
              break;
          } else {
              node.a = -MAXVALUE;
          }
      }
      if (mxa <= node.a) {
          mxa  = node.a;
          node.board.moves = Dagaz.AI.generate(ctx, node.board);
          if (node.board.moves.length == 0) {
              ctx.best = ix;
              break;
          }
          var m = _.chain(node.board.moves)
           .map(function(m) {
                var b = node.board.apply(m);
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
                  node.b += this.analyze(ctx.design, m.board, ctx.board.player);
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
