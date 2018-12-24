(function() {

var MAXVALUE = 1000000;
var MAX_DEEP = 10;

function ForcedAi(params, parent) {
  this.params = params;
  this.parent = parent;
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "forced") || (type == "common") || (type == "1") || (type == "2")) {
      return new ForcedAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

ForcedAi.prototype.setContext = function(ctx, board) {
  if (this.parent) {
      this.parent.setContext(ctx, board);
  }
  ctx.timestamp = Date.now();
  ctx.board = board;
}

ForcedAi.prototype.estimate = function(ctx, board, player, deep) {
  var mn = null;
  board.moves = Dagaz.AI.generate(ctx, board);
  _.each(board.moves, function(move) {
     var mx = null;
     var b = board.apply(move);
     if (deep < MAX_DEEP) {
         b.moves = Dagaz.AI.generate(ctx, b);
         _.each(b.moves, function(move) {
            if (Dagaz.AI.isForced(ctx.design, b, move)) {
                var v = this.estimate(ctx, b, player, deep + 1);
                if (v === null) {
                    mx = MAXVALUE;
                    return;
                }
                if ((mx === null) || (mx < v)) {
                    mx = v;
                }
            }
         }, this);
     }
     if (mx === null) {
         mx = Dagaz.AI.eval(ctx.design, this.params, b, player);
     }
     if ((mn === null) || (mn > mx)) {
         mn = mx;
     }
  }, this);
  return mn;
}

ForcedAi.prototype.getMove = function(ctx) {
  ctx.board.moves = Dagaz.AI.generate(ctx, ctx.board);
  if (ctx.board.moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  var e = Dagaz.AI.eval(ctx.design, this.params, ctx.board, ctx.board.player);
  var mx = null;
  _.each(ctx.board.moves, function(move) {
      if (Dagaz.AI.isForced(ctx.design, ctx.board, move)) {
          var b = ctx.board.apply(move);
          var v = this.estimate(ctx, b, ctx.board.player, 0) - e;
          if (v === null) {
              ctx.best = move;
              mx = MAXVALUE;
              return;
          }
          if (v > 0) {
              if ((mx === null) || (mx < v)) {
                   ctx.best = move;
                   mx = v;
              }
          }
      }
  }, this);
  if (!_.isUndefined(ctx.best)) {
      return {
           done: true,
           move: ctx.best,
           time: Date.now() - ctx.timestamp,
           ai:  "forced"
      };
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

})();
