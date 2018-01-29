(function() {

var moves = [];

function DebugAi(params, parent) {
  this.params = params;
  this.parent = parent;
  moves.push("a5 - b3");
  moves.push("b3 - c1");
  moves.push("c1 - a2");
  moves.push("e5 - d3");
  moves.push("a2 - c3");
  moves.push("c3 - d1");
  moves.push("e4 - d3");
  moves.push("d1 - e3");
  moves.push("e3 - c4");
  moves.push("c4 - b2");
  moves.push("d5 - c4");
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
  if (moves.length > 0) {
      var m = moves.shift();
      _.each(ctx.board.moves, function(move) {
          if (move.toString() == m) {
              ctx.best = move;
          }
      });
  }
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
