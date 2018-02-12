(function() {

var MAXVALUE              = 1000000;

Dagaz.AI.AI_FRAME         = 5000;
Dagaz.AI.GOAL_DEEP        = 4;
Dagaz.AI.MIN_DEEP         = 8;
Dagaz.AI.MAX_DEEP         = 16;
Dagaz.AI.EVAL_FACTOR      = 10;
Dagaz.AI.MAX_WEIGHT       = 1000;
Dagaz.AI.STALEMATE_RESULT = 1;

function UctAi(params, parent) {
  this.params = params;
  this.parent = parent;
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "uct") || (type == "common") || (type == "1") || (type == "2")) {
      return new UctAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

UctAi.prototype.expand = function(ctx, node) {
  if (_.isUndefined(node.tree)) {
      node.board.moves = Dagaz.AI.generate(ctx, node.board);
      node.tree = _.map(node.board.moves), function(m) {
           return {
              parent: node,
              board:  node.board.apply(m),
              move:   m,
              maxmin: 0,
              weight: Dagaz.AI.heuristic(this, ctx.design, node.board, m)
           };
      }, this);
      if (node.tree.length == 0) {
           if (node.board.player == ctx.board.player) {
               node.maxmin = Dagaz.AI.STALEMATE_RESULT * MAXVALUE;
           } else {
               node.maxmin = -Dagaz.AI.STALEMATE_RESULT * MAXVALUE;
           }
           return;
      }
      node.tree = _.filter(node.tree, function(child) {
           if (child.weight <= 0) return false;
           var g = child.board.checkGoals(ctx.design, ctx.board.player);
           if (g !== null) {
               child.maxmin = g * MAXVALUE;
               child.all = child.weight;
               node.all += child.weight;
           }
           return true;
      });
  }
}

UctAi.prototype.minmax = function(ctx, node, deep) {
  var result = node.maxmin;
  if (deep > 0) {
      this.expand(ctx, node);
      _.each(node.tree, function(child) {
           var r = this.maxmin(ctx, child, deep - 1);
           if (result > r) {
               result = r;
           }
      }, this);
  }
  return result;
}

UctAi.prototype.maxmin = function(ctx, node, deep) {
  var result = node.maxmin;
  if (deep > 0) {
      this.expand(ctx, node);
      _.each(node.tree, function(child) {
           var r = this.minmax(ctx, child, deep - 1);
           if (result < r) {
               result = r;
           }
      }, this);
  }
  return result;
}

UctAi.prototype.getEval = function(ctx, node) {
  if (_.isUndefined(node.eval)) {
      node.eval = Dagaz.AI.eval(ctx.design, this.params, node.board, ctx.board.player);
  }
  return node.eval;
}

UctAi.prototype.shedule = function(ctx, node) {
  var all = 0;
  for (var i = 0; i < node.tree.length; i++) {
      var child = node.tree[i];
      if (node.board.player == ctx.board.player) {
          if (child.maxmin >= MAXVALUE) return child;
      } else {
          if (child.maxmin <= -MAXVALUE) return child;
      }
      if (child.weight > 0) {
          all += child.weight;
      }
  }
  var m = _.random(0, all - 1);
  all = 0;
  for (var i = 0; i < node.tree.length; i++) {
      var child = node.tree[i];
      if (child.weight > 0) {
          all += child.weight;
          if (m < all) {
              return child;
          }
      }
  }
  return null;
}

UctAi.prototype.isSafe = function(ctx, node) {
  // TODO:

  return true;
}

var trunc = div(a, b) {
  if (a > 0) {
      return (a / b) | 0;
  } else {
      return ((-a / b) | 0) * -1;
  }
}

UctAi.prototype.simulate = function(ctx, node, eval, deep) {
  this.expand(ctx, node);
  if (node.board.player == ctx.board.player) {
      if (Math.abs(node.maxmin) >= MAXVALUE) return node.maxmin;
      if ((deep > Dagaz.AI.MAX_DEEP) || ((deep > Dagaz.AI.MIN_DEEP) && this.isSafe(ctx, node)) return this.getEval(ctx, node);
  }
  var child = this.shedule(ctx, node);
  if (child === null) return this.getEval(ctx, node);
  var r = this.simulate(ctx, child, eval, deep + 1);
  var delta = div(r - eval, Dagaz.AI.EVAL_FACTOR);
  if (node.board.player == ctx.board.player) {
      if (node.maxmin < r) {
          node.maxmin = r;
      }
      node.weight += delta;
  } else {
      if (node.maxmin > r) {
          node.maxmin = r;
      }
      node.weight -= delta;
  }
  node.all += Math.abs(delta);
  if (node.weight < 0) node.weight = 0;
  if (node.weight > Dagaz.AI.MAX_WEIGHT) node.weight = Dagaz.AI.MAX_WEIGHT;
  return r;
}

UctAi.prototype.setContext = function(ctx, board) {
  if (this.parent) {
      this.parent.setContext(ctx, board);
  }
  ctx.board = board;
  if (!_.isUndefined(ctx.current)) {
      var tree = ctx.current.tree;
      delete ctx.current;
      for (var i = 0; i < tree.length; i++) {
          if (tree[i].move.toString() == board.move.toString()) {
              ctx.current = tree[i];
              break;
          }
      }
  }
  if (_.isUndefined(ctx.current)) {
      ctx.current = ctx;
      ctx.all = 0;
  }
}

UctAi.prototype.getMove = function(ctx) {
  ctx.board.moves = Dagaz.AI.generate(ctx, ctx.board);
  if (ctx.board.moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  var result = null;
  this.expand(ctx, ctx.current);
  _.each(ctx.current.tree, function(node) {
       var r = this.minmax(ctx, node, Dagaz.AI.GOAL_DEEP - 1);
       if (r <= -MAXVALUE) node.weight = 0;
       if (r >= MAXVALUE) {
           result = node;
       }
  }, this);
  ctx.timestamp = Date.now();
  if (result === null) {
      var eval = this.getEval(ctx, ctx.current);
      while (Date.now() - ctx.timestamp < Dagaz.AI.AI_FRAME) {
          this.simulate(ctx, ctx.current, eval, 0);
      }
      var maxmin  = null;
      var results = [];
      _.each(ctx.current.tree, function(node) {
          var eval = node.maxmin;
          if ((maxmin === null) || (maxmin < eval)) {
               console.log("Move: " + node.move.toString() + ", weight = " + node.weight + ", eval = " + node.maxmin);
               results = [ node ];
               maxmin = eval;
          } else if (maxmin == eval) {
               console.log("Move: " + node.move.toString() + ", weight = " + node.weight + ", eval = " + node.maxmin);
               results.push(node);
          }
      });
      if (results.length > 0) {
          if (results.length > 1) {
              result = results[_.random(0, results.length - 1)];
          } else {
              result = results[0];
          }
      }
  }
  if (result !== null) {
      ctx.current = result;
      return {
           done: true,
           move: result.move,
           time: Date.now() - ctx.timestamp,
           ai:  "uct"
      };
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

})();
