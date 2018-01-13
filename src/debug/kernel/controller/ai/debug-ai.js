(function() {

var DEBUG_MOVE = "d5 - d4";

function DebugAi(params, parent) {
  this.params = params;
  this.parent = parent;
}

var findBot = Dagaz.AI.findBot;

Dagaz.AI.findBot = function(type, params, parent) {
  if ((type == "debug") || (type == "common")) {
      return new DebugAi(params, parent);
  } else {
      return findBot(type, params, parent);
  }
}

DebugAi.prototype.setContext = function(ctx, board) {
  if (this.parent) {
      this.parent.setContext(ctx, board);
  }
  ctx.board     = board;
  ctx.timestamp = Date.now();
}

DebugAi.prototype.getMove = function(ctx) {
  ctx.board.moves = Dagaz.AI.generate(ctx, ctx.board);
  if (ctx.board.moves.length == 0) {
      return { done: true, ai: "nothing" };
  }
  ctx.best = null;
  _.each(ctx.board.moves, function(move) {
      if (move.toString() == DEBUG_MOVE) {
          ctx.best = move;
      }
  });
  if (ctx.best !== null) {
      return {
           done: true,
           move: ctx.best,
           time: Date.now() - ctx.timestamp,
           ai:  "debug"
      };
  }
  if (this.parent) {
      return this.parent.getMove(ctx);
  }
}

})();
