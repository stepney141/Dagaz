(function() {

function BruteforceAi(params, parent) {
  this.params = params;
  this.parent = parent;
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "bruteforce") || (type == "solver")) {
      return new BruteforceAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

BruteforceAi.prototype.setContext = function(ctx, board) {
  if (parent !== null) {
      parent.setContext(ctx, board);
  }
  ctx.board = board;
}

var getIx = function(board) {
  return "" + board.zSign + " " + board.player;
}

BruteforceAi.prototype.cache = function(ctx, board) {
  if (_.isUndefined(ctx.cache)) {
      ctx.cache = [];
  }
  var ix = getIx(board);
  if (!_.isUndefined(ctx.cache[ix])) {
      return ctx.cache[ix];
  }
  ctx.cache[ix] = Dagaz.AI.generate(ctx, board);
  return ctx.cache[ix];
}

BruteforceAi.prototype.getMove = function(ctx) {
  var moves = this.cache(ctx, ctx.board);
  var back = null;
  while (moves.length > 0) {
      var m = moves.pop();
      var b = ctx.board.apply(m);
      if ((board.parent !== null) && (b.zSign == board.parent.zSign)) {
          back = m;
          continue;
      }
      var ix = getIx(b);
      if (_.isUndefined(ctx.cache[ix])) {
          if (back !== null) {
              moves.unshift(back);
          }
          return {
              move: m,
              ai:   "bruteforce"
          };
      }
  }
  if (back !== null) {
      return {
         move: back,
         ai:   "back"
      };
  }
  if (parent !== null) {
      return parent.getMove(ctx);
  }
  return { ai: "nothing" };
}

})();
